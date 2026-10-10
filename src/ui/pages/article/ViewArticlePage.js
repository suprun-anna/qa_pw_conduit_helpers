import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleDescriptionButton = page.getByRole('link', { name: 'Edit Article' }).first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert the article has correct description'`, async () => {
      await expect(this.page.getByText(description)).toBeVisible();
    });
  }

  async assertArticleTagsAreVisible(tags) {
    await test.step(`Assert the article has correct tags'`, async () => {
      for (const tag of tags) {
        await expect(this.page.getByText(tag)).toBeVisible();
      }
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the article tag '${tag}' is not visible`, async () => {
      await expect(this.page.getByText(tag)).toHaveCount(0);
    });
  }

  async clickEditArticleButton() {
    await test.step(`Click the 'Edit Article' button`, async () => {
      await this.editArticleDescriptionButton.click();
    });
  }

  async waitForViewArticlePageToBeVisible() {
    await test.step(`Wait for the 'View Article' page to be visible`, async () => {
      await expect(this.page).toHaveURL(/\/article\//);
      await expect(this.editArticleDescriptionButton).toBeVisible();
    });
  }
}
