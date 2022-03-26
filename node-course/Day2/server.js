const http = require("http");
const fs = require("fs");
const USERS = require("./data/user.json");

const PORT = 3000;
const HOST = "127.0.0.1";

let htmlContent;
let htmlCard;

fs.readFile("./index.html", (encoding = "utf-8"), (err, data) => {
    if (err) {
        console.error(err);
    }
    htmlContent = data;
});

fs.readFile("./card.html", (encoding = "utf-8"), (err, data) => {
    if (err) {
        console.error(err);
    }
    htmlCard = data;
});

const userCard = (html, user) => {
    let newHtml = html;
    newHtml = newHtml.replaceAll("{{name}}", user.name);
    newHtml = newHtml.replaceAll("{{company_name}}", user.company.name);
    newHtml = newHtml.replaceAll("{{phone}}", user.phone);
    newHtml = newHtml.replaceAll("{{email}}", user.email);
    return newHtml;
};

const severCB = (req, res) => {
    if (req.url === "/iti") {
        res.end("You are in iti");
    }
    if (req.url === "/os") {
        const usersCards = USERS.map((user) => userCard(htmlCard, user));
        const renderedHtml = htmlContent.replace(
            "{{card}}",
            usersCards.join("")
        );
        // res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(renderedHtml);
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(USERS));
    }
};
const server = http.createServer(severCB);

server.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
