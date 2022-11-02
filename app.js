const express = require("express");
const WebPage = require("./models/webPageModel");
const app = express();
const path = require("path");
var request = require('request');

const {
  createPage,
  createSection,
  getPages,
  getPage,
  getPageSections,
  updatePage,
  updatePageSection,
  deletePage,
  deletePageSection,
  updateRoute,
  getSection,
  getRoute,
} = require("./controller/webPagesController");
const editedRoute = require("./routers/editRoute");
const router = require("./routers/router");

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded());
const staticPath = path.join(__dirname, "./public")
app.use(express.static(staticPath))


app.route("/api/v1/getroute").get(getRoute);
app.route("/api/v1/updateroute").post(updateRoute);
app.route("/eg-admin").get((req,res)=>{
  res.render("adminAuth.pug")
})
app.route("/admin").get((req, res) => {
  const dashboard = "active";
  const pages = "";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin";
  res.render("admin.pug", {
    dashboard: "active",
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/routes").get(async (req, res) => {
  // let WebPages = await WebPage.find();
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/routes";
  res.render("admin.pug", {
    dashboard: dashboard,
    // pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,});

});
app.route("/admin/pages").get(async (req, res) => {
  // let WebPages = await WebPage.find();
  const dashboard = "";
  const pages = "active";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/pages";
  res.render("admin.pug", {
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });

});
app.route("/admin/pages/add-new").get((req, res) => {
  const dashboard = "";
  const pages = "";
  const addNewPage = "active";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/pages/add-new";
  res.render("admin.pug", {
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/pages/update/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "active";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/pages/update";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/pages/update/editor/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "active";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/pages/update/editor";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/pages/delete/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "active";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "";
  const url = "/admin/pages/delete";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/sections/update/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "active";
  const addNewSection = "";
  const url = "/admin/sections/update";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/sections/update/editor/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "active";
  const addNewSection = "";
  const url = "/admin/sections/update/editor";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/sections/delete/:id").get((req, res) => {
  const Id = req.params.id;
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "active";
  const addNewSection = "";
  const url = "/admin/sections/delete";
  res.render("admin.pug", {
    Id: Id,
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/sections/add-new").get((req, res) => {
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "";
  const addNewSection = "active";
  const url = "/admin/sections/add-new";
  res.render("admin.pug", {
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.route("/admin/sections").get((req, res) => {
  const dashboard = "";
  const pages = "";
  const addNewPage = "";
  const sections = "active";
  const addNewSection = "";
  const url = "/admin/sections";
  res.render("admin.pug", {
    dashboard: dashboard,
    pages: pages,
    addNewPage: addNewPage,
    sections: sections,
    addNewSection: addNewSection,
    url: url,
  });
});
app.use(editedRoute);
app.use(router);

app.route("/api/v1/createpage").post(createPage);
app.route("/api/v1/createsection").post(createSection);
app.route("/api/v1/getpage/:id").get(getPage);
app.route("/api/v1/getpages").get(getPages);
app.route("/api/v1/getsections").get(getPageSections);
app.route("/api/v1/getsection/:id").get(getSection);
app.route("/api/v1/updatepage/:id").post(updatePage);
app.route("/api/v1/updatesection/:id").post(updatePageSection);
app.route("/api/v1/deletepage/:id").delete(deletePage);
app.route("/api/v1/deletesection/:id").delete(deletePageSection);


// Handle 404
app.use(function(req, res) {
    res.send('<h1><center>404: Page not Found</center></h1>', 404);
  });

// Handle 500
app.use(function(error, req, res, next) {
  res.send('<h1><center>500: Internal Server Error</center></h1>', 500);
});

module.exports = app;
