import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { getCollection } from "astro:content";

export const categories = {
    getAllCategories: defineAction({
        input: z.null(),
        handler: async () => {
            const allArticles = await getCollection("articles");
            
            const categoriesSet = new Set<string>();
            allArticles.forEach(article => {
                if (article.data.categories) {
                    article.data.categories.forEach(cat => categoriesSet.add(cat));
                } else if ((article.data as any).category) {
                    categoriesSet.add((article.data as any).category);
                }
            });

            const categories = Array.from(categoriesSet).sort();
            return { success: true, categories };
        }
    }),
    
    getArticles: defineAction({
        input: z.object({
            categories: z.array(z.string()).optional().default([]),
            page: z.number().default(1),
            limit: z.number().default(10)
        }),
        handler: async ({ categories, page, limit }) => {
            const allArticles = await getCollection("articles");
            
            let filteredArticles = allArticles;
            if (categories.length > 0) {
                filteredArticles = allArticles.filter(article => {
                    const articleCategories = article.data.categories ||
                        ((article.data as any).category ? [(article.data as any).category] : []);

                    return categories.some(cat =>
                        articleCategories.some(artCat =>
                            artCat.toLowerCase() === cat.toLowerCase()
                        )
                    );
                });
            }

            const sortedArticles = filteredArticles.sort((a, b) =>
                new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
            );
            
            const totalItems = sortedArticles.length;
            const totalPages = Math.ceil(totalItems / limit);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            
            const paginatedArticles = sortedArticles.slice(startIndex, endIndex);
            
            return {
                success: true,
                articles: paginatedArticles,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    itemsPerPage: limit,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            };
        }
    })
};