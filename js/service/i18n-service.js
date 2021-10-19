"use strict";

const gTrans = {
    id: {
        en: "ID :",
        he: "מזהה :",
    },
    company: {
        en: "Company :",
        he: "חברה :",
    },
    model: {
        en: "Model :",
        he: "דגם :",
    },
    price: {
        en: "Price :",
        he: "מחיר :",
    },
    rating: {
        en: "Rating :",
        he: "דירוג :",
    },
    cancel: {
        en: "Cancel",
        he: "ביטול",
    },
    new: {
        en: "New +",
        he: "חדש +",
    },
    sort: {
        en: "Sort by :",
        he: "מיין לפי :",
    },
    NAME: {
        en: "Name",
        he: "שם",
    },
    PRICE: {
        en: "Price",
        he: "מחיר",
    },
    RATING: {
        en: "Rating",
        he: "דירוג",
    },
    delete: {
        en: "Delete",
        he: "מחיקה",
    },
    update: {
        en: "Update",
        he: "עדכון",
    },
    
};

let gCurrLang = "en";

function getTrans(dataStr) {
    const transKey = gTrans[dataStr];
    if (!transKey) return "UNKNOWN";
    const txt = transKey[gCurrLang];
    if (!txt) txt = transKey.en;
    return txt;
}

function doTrans() {
    const els = document.querySelectorAll("[data-trans]");
    els.forEach((el) => {
        const dataTransStr = el.dataset.trans;
        el.innerText = getTrans(dataTransStr);
    });
}

function setLang(lang) {
    gCurrLang = lang;
}
