import { test } from '@playwright/test';

export async function createNewArticle(createArticlePage, article) {
    await test.step(`Create new article`, async () => {
        if (article) {
            await createArticlePage.fillTitleField(article.title ?? '');
            await createArticlePage.fillDescriptionField(article.description ?? '');
            await createArticlePage.fillTextField(article.text ?? '');
            await createArticlePage.fillTagsField(article.tags);
        }
        await createArticlePage.clickPublishArticleButton();
    });
}
