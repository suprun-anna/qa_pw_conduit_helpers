import { test } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

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
    await test.step('Create a new article without tags', async () => {
        article = generateNewArticleData();
        await createNewArticle(createArticlePage, article);
    });
});

test('Edit an article title for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(article.title + ' edited');
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleTitleIsVisible(article.title + ' edited');
});

test('Keep the article description and text when editing the title', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField(article.title + ' edited');
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleTitleIsVisible(article.title + ' edited');
    await viewArticlePage.assertArticleDescriptionIsVisible(article.description);
    await viewArticlePage.assertArticleTextIsVisible(article.text);
});


test('Edit an article description for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField(article.description + ' edited');
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleDescriptionIsVisible(article.description + ' edited');
});

test('Edit an article text for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField(article.text + ' edited');
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleTextIsVisible(article.text + ' edited');
});


test('Add the tag for the existing article without tags', async () => {
    const tags = ['tag1'];
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTagsField(tags);
    await createArticlePage.clickUpdateArticleButton();
    await viewArticlePage.waitForViewArticlePageToBeVisible();
    await viewArticlePage.assertArticleTagsAreVisible(tags);
});

test('Remove an article title for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTitleField('');
    await createArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove an article description for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillDescriptionField('');
    await createArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(DESCRIPTION_CANNOT_BE_EMPTY);
});

test('Remove an article text for the existing article', async () => {
    await viewArticlePage.clickEditArticleButton();
    await createArticlePage.fillTextField('');
    await createArticlePage.clickUpdateArticleButton();
    await createArticlePage.assertErrorMessageContainsText(TEXT_CANNOT_BE_EMPTY);
});
