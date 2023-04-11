const refs = {
	output: document.getElementById("output"),
	template: document.getElementById("template"),
	scienceBtn: document.getElementById("science-btn"),
	languagesBtn: document.getElementById("languages-btn"),
	itBtn: document.getElementById("it-btn"),
	beginnerBtn: document.getElementById("beginner-btn"),
	intermediateBtn: document.getElementById("intermediate-btn"),
	advancedBtn: document.getElementById("advanced-btn"),
	allBtn: document.getElementById("all-btn"),
};

const courses = await fetch("../db/courses.json")
	.then(res => res.json())
	.catch(err => console.log(err));

const source = refs.template.innerHTML;
const template = Handlebars.compile(source);
const html = template(courses);
refs.output.innerHTML = html;

refs.scienceBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.category === "Science");
	refs.output.innerHTML = template(filtered);
});

refs.languagesBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.category === "Languages");
	refs.output.innerHTML = template(filtered);
});

refs.itBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.category === "IT");
	refs.output.innerHTML = template(filtered);
});

refs.beginnerBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.level === "Beginner");
	refs.output.innerHTML = template(filtered);
});

refs.intermediateBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.level === "Intermediate");
	refs.output.innerHTML = template(filtered);
});

refs.advancedBtn.addEventListener("click", () => {
	const filtered = courses.filter(c => c.level === "Advanced");
	refs.output.innerHTML = template(filtered);
});

refs.allBtn.addEventListener("click", () => {
	refs.output.innerHTML = template(courses);
});
