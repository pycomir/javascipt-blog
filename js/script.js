{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log(event);
    console.log('Link was clicked!');
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE]add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);
    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
    //console.log('targetArticle:', targetArticle);
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post .post-author',
    optTagsListSelector = '.list.tags',
    optAuthorListSelector = '.list.authors',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function(customSelector = '') {
    //console.log(generateTitleLinks);
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    //console.log('titleList:', titleList);
    titleList.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(articles);
    let html = '';
    for(let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId);
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //console.log(articleTitle);
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;
      /*titleList.insertAdjacentHTML('beforeend', linkHTML);
      console.log(titleList);*/
    }
    titleList.innerHTML = html;
    //console.log(html);
    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags) {
    const params = {max: 0, min: 999999};
    for(let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  };


  const generateTags = function() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    console.log(allTags);
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles) {
      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      //console.log('titleList:', titleList);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log(articleTags);
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray) {
        //console.log(tag);
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '&nbsp' + '</a></li>';
        //console.log(linkHTML);
        /* add generated code to html variable */
        html = html + linkHTML;
        //console.log(html);
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
          //console.log(allTags);
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
      //console.log(html);
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    //console.log(tagList);
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';
    /*[NEW] start LOOP for for each tags in allTags*/
    for(let tag in allTags) {
      /*[NEW] generate code of a link and add it to allTagsHTML*/
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      //console.log(tagLinkHTML);
      allTagsHTML +=  '<li><a class="' + tagLinkHTML + '" href="#tag-' + tag +'">' + tag + '</a></li>';
      //console.log(allTagsHTML);
    /*[NEW] END LOOP: for each tag in allTags*/
    }
    /*[NEW] add html from allTagsHTML to tagList*/
    tagList.innerHTML = allTagsHTML ;
    //tagList.innerHTML = allTags.join(' ');
    console.log(tagList);
  };

  generateTags();

  const tagClickHandler = function(event) {
    console.log(event);
    console.log('tag was clicked');
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log(event);
    //console.log('Link was clicked!');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log(tag);
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a[href="' + href + '"]');
    //console.log(activeTags);
    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);
    //console.log(tagLinks);
    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');
      //console.log(tagLink);
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function() {
    //console.log(addClickListenersToTags);
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a[href^="#tag-"],  .sidebar a[href^="#tag-"]');
    //console.log (links);
    /* START LOOP: for each link */
    for(let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const calculateAuthorsParams = function(authors) {
    const params = {max: 0, min: 999999};
    for(let author in authors) {
      console.log(author + ' occur ' + authors[author] + 'times');
      if(authors[author] > params.max){
        params.max = authors[author];
      }
      if(authors[author] < params.min){
        params.min = authors[author];
      }
    }
    return params;
  };

  const generateAuthors = function() {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    console.log(allAuthors);
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles) {
      /* find author wrapper */
      const titleList = article.querySelector(optArticleAuthorSelector);
      //console.log(titleList);
      /* make html variable with empty string */
      let html = '';
      /* get authors from data-author attribute */
      const author = article.getAttribute('data-author');
      //console.log(author);
      /*create HTML of the link*/
      const linkHTML ='by &nbsp' + '<a href="#author-' + author +'">' + author + '</a>';
      //console.log(linkHTML);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(author)){
        /* [NEW] add tag to allTags object */
        allAuthors[author] = 1;
        //console.log(allTags);
      } else {
        allAuthors[author]++;
      }
      /* insert HTML of all the links into the author wrapper */
      titleList.innerHTML = html + linkHTML;
      //console.log(titleList);
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector(optAuthorListSelector);
    console.log(authorList);
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams', authorsParams);
    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    /*[NEW] start LOOP for for each author in allAuthors*/
    for(let author in allAuthors) {
      /*[NEW] generate code of a link and add it to allAuthorsHTML*/
      allAuthorsHTML += '<li><a href="#author-' + author +'">' + author + ' ('+ allAuthors[author] +') ' + '</a></li>';
      //console.log(allAuthorsHTML);
    /*[NEW] END LOOP: for each author in allAuthors*/
    }
    /*[NEW] add html from allAuthorsHTML to authorList*/
    authorList.innerHTML = allAuthorsHTML;
  };

  generateAuthors();

  const authorClickHandler = function(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log(event);
    console.log('Author was clicked!');
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log(href);
    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    //console.log(author);
    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a[href="' + href + '"]');
    //console.log(activeAuthors);
    /* START LOOP: for each active tag link */
    for(let activeAuthor of activeAuthors) {
      /* remove class active */
      activeAuthor.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('href');
    //console.log(authorLinks);
    /* START LOOP: for each found tag link */
    for(let authorLink of authorLinks) {
      /* add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function() {
    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a, .list.authors a');
    //console.log(links);
    /* START LOOP: for each link */
    for(let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();

}
