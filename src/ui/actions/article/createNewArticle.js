import { test } from '@playwright/test';

export async function createNewArticle(page, article) {
    await test.step(`Create new article`, async () => {
        if (article) {
            await page.fillTitleField(article.title ?? '');
            await page.fillDescriptionField(article.description ?? '');
            await page.fillTextField(article.text ?? '');
            await page.fillTagsField(article.tags);
        }
        await page.clickPublishArticleButton();
    });
}
