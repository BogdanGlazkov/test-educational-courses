const refs = {
	output: document.querySelector("#output"),
	template: document.querySelector("#template"),
	filterBtn: document.querySelector(".filter"),
	allBtn: document.querySelector("#all-btn"),
	input: document.querySelector(".filter__input"),
};

const filters = {
	category: "",
	level: "",
};

const courses = await fetch("../db/courses.json")
	.then(res => res.json())
	.catch(err => console.log(err));

const source = refs.template.innerHTML;
const template = Handlebars.compile(source);
const html = template(courses);
refs.output.innerHTML = html;

const applyFilters = () => {
	const filtered = courses.filter(course => {
		if (filters.category && filters.category !== course.category.toLowerCase()) {
			return false;
		}
		if (filters.level && filters.level !== course.level.toLowerCase()) {
			return false;
		}
		return true;
	});
	refs.output.innerHTML = template(filtered);
};

const setCategoryFilter = category => {
	filters.category = category;
	applyFilters();
};

const setLevelFilter = level => {
	filters.level = level;
	applyFilters();
};

const clearFilter = () => {
	filters.category = "";
	filters.level = "";
};

refs.filterBtn.addEventListener("click", event => {
	const filterButton = event.target.closest(".filter__btn");
	if (!filterButton) return;

	const category = filterButton.dataset.category;
	const level = filterButton.dataset.level;

	if (category) {
		setCategoryFilter(category);
	} else if (level) {
		setLevelFilter(level);
	}
});

refs.allBtn.addEventListener("click", () => {
	clearFilter();
	refs.output.innerHTML = template(courses);
});

refs.input.addEventListener("input", event => {
	const query = event.target.value;
	if (!query.trim()) return;
	const filtered = courses.filter(course => course.name.toLowerCase().includes(query.toLowerCase()));
	refs.output.innerHTML = template(filtered);
});
