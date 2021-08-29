var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, {
    width: 384,
    height: 404
});
// Main
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    yield figma.loadFontAsync({
        family: "Roboto",
        style: "Regular"
    });
    if (msg.type === 'PageLinks') {
        PageLinks();
    }
    else if (msg.type === 'AllPagesFrameLinks') { // figma blocks this method
        const eachpage = figma.root.children;
        var list = [];
        for (let i = 0; i < eachpage.length; i++) {
            const frames = eachpage[i].findChildren(n => n.type === 'FRAME');
            const linkerFrame = figma.createFrame();
            linkerFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
            linkerFrame.cornerRadius = 16;
            linkerFrame.name = eachpage[i].name.toString();
            linkerFrame.visible = false;
            linkerFrame.locked = true;
            eachpage[i].appendChild(linkerFrame);
            list.push(linkerFrame);
            for (let i = 0; i < frames.length; i++) {
                list.push(frames[i]);
            }
        }
        if (list.length > 0) {
            getAllPagesFramelinks(list);
        }
        else if (list.length === 0) {
            figma.notify("No Frames Are In This File.");
        }
    }
    else if (msg.type === 'AllFrameLinks') {
        const list = figma.currentPage.findChildren(n => n.type === 'FRAME');
        if (list.length > 0) {
            getArrayLinks(list);
        }
        else if (list.length === 0) {
            figma.notify("No Frames Are In This Page.");
        }
    }
    else if (msg.type === 'SelectedFrameLinks') {
        const list = figma.currentPage.selection;
        if (list.length > 0) {
            getArrayLinks(list);
        }
        else if (list.length === 0) {
            figma.notify("Select Frames");
        }
    }
    else if (msg.type === 'ConditionalLinks') {
        var list = [];
        // console.log(msg.IsWidthSelected, msg.IsHeightSelected)
        if (msg.IsWidthSelected === true && msg.IsHeightSelected === false) {
            list = figma.currentPage.findChildren(n => n.type === 'FRAME' && n.width === msg.SelectedWidth);
        }
        else if (msg.IsWidthSelected === false && msg.IsHeightSelected === true) {
            list = figma.currentPage.findChildren(n => n.type === 'FRAME' && n.height === msg.SelectedHeight);
        }
        else if (msg.IsWidthSelected === true && msg.IsHeightSelected === true) {
            list = figma.currentPage.findChildren(n => n.type === 'FRAME' && n.width === msg.SelectedWidth && n.height === msg.SelectedHeight);
        }
        else if (msg.IsWidthSelected === false && msg.IsHeightSelected === false) {
            figma.notify("Give Conditions");
        }
        if (msg.IsWidthSelected === true || msg.IsHeightSelected === true && list.length < 0) {
            getArrayLinks(list);
        }
        else if (msg.IsWidthSelected === true || msg.IsHeightSelected === true && list.length === 0) {
            figma.notify(" No Frames Exist With Given Conditions");
        }
    }
    // figma.closePlugin();
});
// Functions Area
function getArrayLinks(main) {
    const nodes = [];
    const frameTOC = figma.createFrame();
    frameTOC.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    frameTOC.cornerRadius = 16;
    frameTOC.layoutMode = "VERTICAL";
    frameTOC.primaryAxisSizingMode = "AUTO";
    frameTOC.counterAxisSizingMode = "AUTO";
    frameTOC.horizontalPadding = 16;
    frameTOC.verticalPadding = 16;
    frameTOC.itemSpacing = 16;
    frameTOC.name = "Table of Content";
    const title1 = figma.createText();
    frameTOC.appendChild(title1);
    title1.fontSize = 24;
    title1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    title1.name = "Title";
    title1.characters = figma.currentPage.name.toString();
    const div1 = figma.createRectangle();
    frameTOC.appendChild(div1);
    div1.resizeWithoutConstraints(2, 2);
    div1.layoutAlign = "STRETCH";
    div1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    div1.name = "DIV";
    // Main Logic
    for (let i = 0; i < main.length; i++) {
        const tb1 = figma.createText();
        frameTOC.appendChild(tb1);
        tb1.fontSize = 16;
        tb1.textDecoration = "UNDERLINE";
        tb1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        tb1.characters = main[i].name;
        tb1.name = main[i].name;
        const link = main[i].id;
        console.log(link);
        tb1.hyperlink = { type: "NODE", value: link };
    }
    nodes.push(frameTOC);
    figma.viewport.scrollAndZoomIntoView(nodes);
    return frameTOC;
}
////////////////////////////////////////////////////////////////////
function getAllPagesFramelinks(main) {
    const nodes = [];
    const frameTOC = figma.createFrame();
    frameTOC.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    frameTOC.cornerRadius = 16;
    frameTOC.layoutMode = "VERTICAL";
    frameTOC.primaryAxisSizingMode = "AUTO";
    frameTOC.counterAxisSizingMode = "AUTO";
    frameTOC.horizontalPadding = 16;
    frameTOC.verticalPadding = 16;
    frameTOC.itemSpacing = 16;
    frameTOC.name = "Table of Content";
    const title1 = figma.createText();
    frameTOC.appendChild(title1);
    title1.fontSize = 24;
    title1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    title1.name = "Title";
    title1.characters = figma.root.name.toString();
    const div1 = figma.createRectangle();
    frameTOC.appendChild(div1);
    div1.resizeWithoutConstraints(2, 2);
    div1.layoutAlign = "STRETCH";
    div1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    div1.name = "DIV";
    // Main Logic
    for (let i = 0; i < main.length; i++) {
        const tb1 = figma.createText();
        frameTOC.appendChild(tb1);
        tb1.fontSize = 16;
        tb1.textDecoration = "UNDERLINE";
        tb1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        tb1.characters = main[i].name;
        tb1.name = main[i].name;
        const link = main[i].id;
        console.log(link);
        tb1.hyperlink = { type: "NODE", value: link };
    }
    nodes.push(frameTOC);
    figma.viewport.scrollAndZoomIntoView(nodes);
    return frameTOC;
}
////////////////////////////////////////////////////////////////////
function PageLinks() {
    const nodes = [];
    var main = [];
    const pages = figma.root.children;
    for (let i = 0; i < pages.length; i++) {
        const linkerFrame = figma.createFrame();
        linkerFrame.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
        linkerFrame.cornerRadius = 16;
        linkerFrame.name = pages[i].name.toString();
        linkerFrame.visible = false;
        linkerFrame.locked = true;
        pages[i].appendChild(linkerFrame);
        main.push(linkerFrame);
    }
    const frameTOC = figma.createFrame();
    frameTOC.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
    frameTOC.cornerRadius = 16;
    frameTOC.layoutMode = "VERTICAL";
    frameTOC.primaryAxisSizingMode = "AUTO";
    frameTOC.counterAxisSizingMode = "AUTO";
    frameTOC.horizontalPadding = 16;
    frameTOC.verticalPadding = 16;
    frameTOC.itemSpacing = 16;
    frameTOC.name = "Table of Content";
    const title1 = figma.createText();
    frameTOC.appendChild(title1);
    title1.fontSize = 24;
    title1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    title1.name = "Title";
    title1.characters = figma.root.name.toString();
    const div1 = figma.createRectangle();
    frameTOC.appendChild(div1);
    div1.resizeWithoutConstraints(2, 2);
    div1.layoutAlign = "STRETCH";
    div1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    div1.name = "DIV";
    // Main Logic
    for (let i = 0; i < main.length; i++) {
        const tb1 = figma.createText();
        frameTOC.appendChild(tb1);
        tb1.fontSize = 16;
        tb1.textDecoration = "UNDERLINE";
        tb1.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        tb1.characters = main[i].name;
        tb1.name = main[i].name;
        const link = main[i].id;
        tb1.hyperlink = { type: "NODE", value: link };
    }
    nodes.push(frameTOC);
    figma.viewport.scrollAndZoomIntoView(nodes);
    return frameTOC;
}
