const WebPage = require("../models/webPageModel");
const pageSections = require("../models/pageSectionModel");
const editRoute = require("../models/editRouteModel");
const Path = require("path");
const fs = require("fs");

// exports.getAdminPage = (req,res)=>{

//   res.sendFile(Path.join(__dirname+'/admin.html'))
// }

// creating create Page File functin for create page function
createPageFile = (fileName, content) => {
  const Content = content?.toString();
  fs.writeFile(
    Path.join(__dirname, `../views/${fileName}.pug`),
    Content,
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    }
  );
};

// creating create Page Route File functin for create page function
createPageRoute = (path, fileName) => {
  fs.appendFile(
    Path.join(__dirname, `../routers/router.js`),
    `createRoute("${path}","${fileName}");\n`,
    (err) => {
      if (err) console.log(err);
      else {
        console.log("New Route Created!");
      }
    }
  );
};
createFile = (file, content) => {
  fs.writeFile(
    file,
    content,
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    }
  );
};

exports.getRoute = async (req, res) => {
  let Route = await editRoute.findById("6361106ce68a28ebb37e9f01");
  res.status(200).json({
    success: true,
    Route,
  });
};
exports.updateRoute = async (req, res) => {
  let Route = await editRoute.findById("6361106ce68a28ebb37e9f01");
  const code = req.body.code;

  createFile(Path.join(__dirname,"../routers/editRoute.js"), `const express = require("express");
  const editedRoute = express.Router();
  const Path = require("path");
  const WebPage = require("../models/webPageModel");
  module.exports = editedRoute;
  
  // add custom route below - be carefull while writing code
  ${code}
  `);
  Route = await editRoute.findByIdAndUpdate("6361106ce68a28ebb37e9f01", req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.redirect('back')
  // res.status(200).json({
  //   success: true,
  //   Route,
  // });
};

exports.createPage = async (req, res) => {
  const Pages = await WebPage.create(req.body);
  const fileName = req.body.fileName;
  const pageContent = req.body.pageContent;

  createPageFile(fileName, pageContent);
  // createPageRoute(pageURL, fileName);
  res.redirect('/admin/pages')
  // res.status(201).json({
  //   success: true,
  //   Pages,
  // });
};

// creating create Page Section File functin for create page function
createPageSectionFile = (fileName, content) => {
  fs.writeFile(
    Path.join(__dirname, `../views/common/${fileName}.pug`),
    content,
    (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    }
  );
};

exports.createSection = async (req, res) => {
  const PageSections = await pageSections.create(req.body);
  const fileName = req.body.fileName;
  const SectionContent = req.body.sectionContent;
  createPageSectionFile(fileName, SectionContent);
  res.redirect("/admin/sections")
  // res.status(201).json({
  //   success: true,
  //   PageSections,
  // });
};

// getting all pages
exports.getPages = async (req, res) => {
  const Pages = await WebPage.find();
  res.status(200).json({
    success: true,
    Pages,
  });
};
// getting all page Section
exports.getPageSections = async (req, res) => {
  const getPageSection = await pageSections.find();
  res.status(200).json({
    success: true,
    getPageSection,
  });
};

// // creating update page route function for updating pages
// updatePageRoute = (oldpath, oldFileName, newPath, newFileName) => {
//   const filePath = Path.join(__dirname, `../routers/router.js`);
//   fs.readFile(filePath, function (err, data) {
//     if (err) console.log(err);
//     const toReplace = `createRoute("${oldpath}","${oldFileName}");`;
//     const regex = new RegExp(toReplace, "g");
//     const newValue = data.toString().replace(regex, `createRoute("${newPath}","${newFileName}");`);

//     fs.writeFile(filePath, newValue, function (err, data) {
//       if (err) throw err;
//       console.log("Page Route Updated");
//     });
//   });
// };

// creating update page file function for updating pages
updatePageFile = (oldFileName, newFileName, oldContent, newContent,thisIsPage) => {
  const oldFilePath = Path.join(__dirname, `../views/${thisIsPage ? oldFileName : 'common/'+oldFileName}.pug`);
  const newFilePath = Path.join(__dirname, `../views/${thisIsPage ? newFileName : 'common/'+newFileName}.pug`);
 

  // const newValue = `${newContent}`;
  fs.rename(oldFilePath, newFilePath, (error) => {
    if (error) {
      // Show the error
      console.log(error);
    } else {
      // fs.writeFileSync(newFilePath, newValue);
      fs.readFile(newFilePath, function (err, data) {
        if (err) console.log(err);
        const regex = new RegExp(`${oldContent}`, "g");
        const newValue = data?.toString().replace(regex, `${newContent}`);

        fs.writeFile(newFilePath, newValue, function (err, data) {
          if (err) throw err;
          console.log("File Renamed and Updated!");
        });
      });
    }
  });
};
// updating pages by id
exports.updatePage = async (req, res) => {
  let WebPages = await WebPage.findById(req.params.id);
  // const oldPath = WebPages.pageURL;
  const oldFileName = WebPages?.fileName;
  const oldContent = WebPages?.pageContent;
  if (!WebPages) {
    return res.status(500).json({
      success: false,
      message: "Webpages not found",
    });
  }

  WebPages = await WebPage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  const newFileName = req.body.fileName;
  // const newPath = req.body.pageURL;
  const newContent = req.body.pageContent;

  updatePageFile(oldFileName, newFileName, oldContent, newContent,true);
  res.redirect('back');
  // res.status(200).json({
  //   success: true,
  //   message: "updated page successfully",
  //   WebPages,
  // });
  
};
// getting pages by id
exports.getPage = async (req, res) => {
  let WebPages = await WebPage.findById(req.params.id);
  // const oldPath = WebPages.pageURL;

  if (!WebPages) {
    return res.status(500).json({
      success: false,
      message: "Webpages not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "updated page successfully",
    WebPages,
  });
};
// getting section by id
exports.getSection = async (req, res) => {
  let Section = await pageSections.findById(req.params.id);
  // const oldPath = WebPages.pageURL;

  if (!Section) {
    return res.status(500).json({
      success: false,
      message: "Section not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "updated page successfully",
    Section,
  });
};
// updating pages by id
exports.updatePageSection = async (req, res) => {
  let PageSections = await pageSections.findById(req.params.id);
  // const oldPath = WebPages.pageURL;
  const oldFileName = PageSections.fileName;
  const oldContent = PageSections.sectionContent;
  if (!PageSections) {
    return res.status(500).json({
      success: false,
      message: "Page Section not found",
    });
  }

  PageSections = await pageSections.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  const newFileName = req.body.fileName;
  const newContent = req.body.sectionContent;
  updatePageFile(oldFileName, newFileName, oldContent, newContent);

  res.status(200).json({
    success: true,
    message: "updated page section successfully",
    PageSections,
  });
};

deleteFiles = (fileName,thisIsPage)=>{
  fs.unlink(Path.join(__dirname, `../views/${thisIsPage ? fileName : 'common/'+fileName}.pug`), function (err) {
    if (err) throw err;
    // if no error, file has been deleted successfully
    console.log('File deleted!');
});
}


exports.deletePage = async (req, res) => {
  let WebPages = await WebPage.findById(req.params.id);
  const FileName = WebPages.fileName;
  if (!WebPages) {
    return res.status(500).json({
      success: false,
      message: "Page not found",
    });
  }

  await WebPages.remove();
  deleteFiles(FileName,true);

  // res.redirect('back')
  res.status(200).json({
    success: true,
    message: "Page Deleted successfully",
    WebPages,
  });
};
exports.deletePageSection = async (req, res) => {
  let PageSection = await pageSections.findById(req.params.id);
  const FileName = PageSection.fileName;
  if (!PageSection) {
    return res.status(500).json({
      success: false,
      message: "Page not found",
    });
  }

  await PageSection.remove();
  deleteFiles(FileName,false);

  // res.redirect("/admin/sections")  
  res.status(200).json({
    success: true,
    message: "Page Section Deleted successfully",
    PageSection,
  });
};