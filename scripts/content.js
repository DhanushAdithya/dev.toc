const $ = document.querySelector.bind(document);
const create = document.createElement.bind(document);

const addToC = () => {
	const articleBody = $("#article-body");
	const articleHeadings = [...articleBody.children].filter(e =>
		/h[1-6]/g.test(e.localName)
	);

	const tocDetails = create("details");
	tocDetails.classList.add("devtoc__details");

	const tocSummary = create("summary");
	tocSummary.textContent = "Table of Contents";
	tocSummary.classList.add("devtoc__summary");

	const tocList = create("ul");
	tocList.classList.add("devtoc__ul");

	const titleItem = create("li");
	const titleAnchor = create("a");
	titleAnchor.href = "#main-title";
	titleAnchor.textContent = $(
		".crayons-article__header__meta h1"
	).textContent.trim();

	titleAnchor.addEventListener("click", e => {
		e.preventDefault();
		tocDetails.open = false;
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	});

	titleItem.append(titleAnchor);
	tocList.append(titleItem);

	tocDetails.append(tocSummary);
	tocDetails.append(tocList);

	if (articleHeadings.length) {
		const headingList = create("ul");
		let currentList = headingList;
		let currentLevel = Math.min(
			...articleHeadings.map(e => +e.localName.slice(1))
		);

		for (const heading of articleHeadings) {
			const level = +heading.localName.slice(1);

			if (level > currentLevel) {
				const newList = create("ul");
				if (currentList.lastElementChild)
					currentList.lastElementChild.append(newList);
				else
					currentList.append(newList);
				currentList = newList;
				currentLevel = level;
			} else if (level < currentLevel) {
				currentList = currentList.parentElement;
				currentLevel = level;
			}

			const headingItem = create("li");
			const headingLink = create("a");
			headingLink.href = [...heading.children].at(0).href;
			headingLink.textContent = heading.textContent.trim();

			headingLink.addEventListener("click", e => {
				e.preventDefault();
				tocDetails.open = false;
				const headingTop = heading.offsetTop;
				window.scrollTo({
					top: headingTop - 35,
					behavior: "smooth",
				});
			});

			headingItem.append(headingLink);
			currentList.append(headingItem);
		}
		tocList.append(headingList);
	}

	articleBody.prepend(tocDetails);
};

const targetNode = document.body;
const observer = new MutationObserver(mutations => {
	if (mutations[0].target === document.body) {
		const articleBody = $("#article-body");
		if (articleBody) addToC();
	}
});
const unobserve = () => {
	observer.disconnect();
};

const loadExtension = () => {
	if ($("#article-body")) addToC();
	observer.observe(targetNode, { childList: true });
};

loadExtension();
