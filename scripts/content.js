const articleBody = document.getElementById("article-body");
const articleHeadings = Array.from(articleBody.children).filter(
    (e) => /h[1-6]/g.test(e.localName)
);

const tocDetails = document.createElement("details");
tocDetails.classList.add("devtoc__details");

const tocSummary = document.createElement("summary");
tocSummary.textContent = "Table of Contents";
tocSummary.classList.add("devtoc__summary");

const tocList = document.createElement("ul");
tocList.classList.add("devtoc__ul");

const titleItem = document.createElement("li");
const titleAnchor = document.createElement("a");
titleAnchor.href = "#main-title";
titleAnchor.textContent = document
    .querySelector(".crayons-article__header__meta h1")
    .textContent.trim();

titleAnchor.addEventListener("click", (e) => {
    e.preventDefault();
    tocDetails.open = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
});

titleItem.append(titleAnchor);
tocList.append(titleItem);

tocDetails.append(tocSummary);
tocDetails.append(tocList);

if (articleHeadings.length > 0) {
    const headingList = document.createElement("ul");
    for (const heading of articleHeadings) {
        const headingItem = document.createElement("li");
        const headingLink = document.createElement("a");
        headingLink.href = Array.from(heading.children)[0].href;
        headingLink.textContent = heading.textContent.trim();

        headingLink.addEventListener("click", (e) => {
            e.preventDefault();
            tocDetails.open = false;
            const headingTop = heading.offsetTop;
            window.scrollTo({ top: headingTop - 35, behavior: "smooth" });
        });

        headingItem.append(headingLink);
        headingList.append(headingItem);
    }
    tocList.append(headingList);
}

articleBody.prepend(tocDetails);
