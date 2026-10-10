import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let homePage;
let createArticlePage;
let viewArticlePage;
let article;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);
    viewArticlePage = new ViewArticlePage(page);

    const user = generateNewUserData();
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await test.step('Create a new article with tags', async () => {
        article = generateNewArticleData(3);
        await createNewArticle(createArticlePage, article);
    });
});

test('Add the tag for the existing article with tags', async () => {
    const tags = ['tag1'];
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTagsField(tags);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTagsAreVisible(tags);
});

test('Remove an article tag for the existing article with tag', async () => {
    const removedTag = article.tags[0];
    const remainingTags = article.tags.slice(1);

    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.clickTagDeleteButton(removedTag);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleTagsAreVisible(remainingTags);
    await viewArticlePage.assertArticleTagIsNotVisible(removedTag);
});