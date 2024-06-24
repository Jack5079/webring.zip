import { writeFile, readFile, mkdir } from "node:fs/promises"

const dist = mkdir("dist", { recursive: true })
const sites_txt = await readFile("sites.txt", "utf-8")
const sites = sites_txt.split("\n").filter(Boolean)

const redirects = sites
	.flatMap((site, index) => [
		`/prev/${site} ${sites.at(index - 1)} 301`,
		`/next/${site} ${sites[(index + 1) % sites.length]} 301`,
	])
	.join("\n")

await dist
writeFile(
	"dist/_redirects",
	redirects + "\n/ https://github.com/Jack5079/webring.zip 301"
)
