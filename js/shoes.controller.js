"use strict";

const elSectionDB = document.querySelector(".db-render");
const elModalDetails = document.querySelector(".modal-details");

let gElModalOpen = false;
let gElListStyleCard = true;

function renderShoes() {
    const shoes = getShoes();
    const strHtmls = shoes.map((shoe) => {
        return `<ul class="${getListStyle()}" onclick="onOpenModalDetails('${shoe.id}')">
        <div class="list-head">
            <li><p><span data-trans="id">${getTrans('id')}</span><span>${shoe.id}</span></p></li>
            <li><img src="${shoe.imgUrl}" alt=""></li>
        </div>
        <div class="list-body">
            <div class="list-body-box">
                <li><p><span data-trans="company">${getTrans('company')}</span><span>${shoe.vendor}</span></p></li>
                <li><p><span data-trans="model">${getTrans('model')}</span><span>${shoe.model}</span></p></li>
            </div>
            <div class="list-body-box">
                <li><p><span data-trans="price">${getTrans('price')}</span><span>${shoe.price}</span></p></li>
                <li><p><span data-trans="rating">${getTrans('rating')}</span><span>${shoe.rating}</span></p></li>
            </div>
        </div>
        <div class="action-box">
            <li><button data-trans="update" class="btn btn-update btn-orange" onclick="onUpdateShoe(event, '${shoe.id}')">${getBtnUpdateHTML()}</button></li>
            <li><button data-trans="delete" class="btn btn-delete btn-red" onclick="onRemoveShoe(event, '${shoe.id}')">${getBtnDeleteHTML()}</button></li>
        </div>
        </ul>`;
    });
    elSectionDB.innerHTML = strHtmls.join("");
    document.querySelector('.current-page').innerText = getCurrPage();
    document.querySelector('.pages-count').innerText = getPagesCount();
}

function renderShoeDetails(shoeId) {
    const shoe = gShoes.find((shoe) => shoe.id === shoeId);
    const elModalDetails = document.querySelector(".modal-details");
    const strHTML = `
    <button class="btn btn-close" onclick="onCloseDetails()">↩</button>
    <h2>${shoe.model} <span>Made by</span> ${shoe.vendor}</h2>
    <p>${shoe.description}</p>
    <img src="${shoe.imgUrl}" alt="${shoe.vendor}_${shoe.model}">
    <div class="rate-box">
        <!-- render buttons from js -->
        <button class="btn btn-rate" onclick="onRateShoeLower('${shoeId}')">-</button>
        <p>${shoe.rating}</p>
        <button class="btn btn-rate" onclick="onRateShoeHigher('${shoeId}')">+</button>
    </div>`;
    elModalDetails.innerHTML = strHTML;
}

function onAddShoe() {
    const elVendorInput = document.querySelector("#vendor-input");
    const elModelInput = document.querySelector("#model-input");
    const elPriceInput = document.querySelector("#price-input");
    const elDescriptionInput = document.querySelector("#description-input");
    const elUrlInput = document.querySelector("#url-input");
    addShoe(
        elVendorInput.value,
        elModelInput.value,
        elPriceInput.value,
        elDescriptionInput.value,
        elUrlInput.value
    );
    renderShoes();

    elModelInput.value = "";
    elPriceInput.value = "";
    elDescriptionInput.value = "";
    elUrlInput.value = "";
}

function onSetSort(sortBy) {
    console.log("Sorting By:", sortBy);
    setSort(sortBy);
    renderShoes();
}

function onOpenModalDetails(shoeId) {
    elModalDetails.classList.remove("hidden");
    renderShoeDetails(shoeId);
}

function onRateShoeHigher(shoeId) {
    RateShoeHigher(shoeId);
    renderShoeDetails(shoeId);
}

function onRateShoeLower(shoeId) {
    RateShoeLower(shoeId);
    renderShoeDetails(shoeId);
}

function onCloseDetails() {
    elModalDetails.classList.add("hidden");
    renderShoes();
}

function onUpdateShoe(ev, shoeId) {
    ev.stopPropagation();
    const newPrice = +prompt("Enter new price");
    if (!newPrice) return;
    updateShoe(shoeId, newPrice);
    renderShoes();
}

function onRemoveShoe(ev, shoeId) {
    ev.stopPropagation();
    if (!confirm("Are you sure?")) return;
    removeShoe(shoeId);
    renderShoes();
}

function closeAllModals() {
    closeModalNew();
}

// VIEW
function onToggleModalNew(ev) {
    ev.stopPropagation();
    if (!gElModalOpen) openModalNew();
    else closeModalNew();
}

function openModalNew() {
    const elModalNew = document.querySelector(".modal-new");
    const elBtnNew = document.querySelector(".btn-new");
    gElModalOpen = true;
    elModalNew.classList.remove("hidden");
    elBtnNew.classList.remove("btn-green");
    elBtnNew.classList.add("btn-red");
    elBtnNew.innerText = getTrans("cancel");
}

function closeModalNew() {
    const elModalNew = document.querySelector(".modal-new");
    const elBtnNew = document.querySelector(".btn-new");
    gElModalOpen = false;
    elModalNew.classList.add("hidden");
    elBtnNew.classList.add("btn-green");
    elBtnNew.classList.remove("btn-red");
    elBtnNew.innerText = getTrans("new");
}

function getBtnDeleteHTML() {
    return (gElListStyleCard) ? 'Delete' : `<img src="icons/garbage-can.png" alt="garbage_icon">`;
}

function getBtnUpdateHTML() {
    return (gElListStyleCard) ? 'Update' : `<img src="icons/system-update.png" alt="system_update">`;
}

function getListStyle() {
    return (gElListStyleCard) ? 'list-card' : 'list-list';
}

function onOrderList() {
    if (gElListStyleCard) orderList("LIST");
    else orderList("CARD");
}

function orderList(str) {
    if (str === "LIST") {
        gElListStyleCard = false;
        elSectionDB.classList.remove('direction-row');
        elSectionDB.classList.add('direction-col');
        const elBtnList = document.querySelector(".btn-list");
        elBtnList.innerHTML = `<img src="icons/list-interface.png" alt="list_icon">`;
        const elLists = document.querySelectorAll(".db-render ul");
        elLists.forEach((list) => {
            const elBtnDelete = list.querySelector(".btn-delete");
            const elBtnUpdate = list.querySelector(".btn-update");
            elBtnDelete.innerHTML = `<img src="icons/garbage-can.png" alt="garbage_icon">`;
            elBtnUpdate.innerHTML = `<img src="icons/system-update.png" alt="update_icon">`;
            list.classList.add("list-list");
            list.classList.remove("list-card");
        });
    } else if (str === "CARD") {
        gElListStyleCard = true;
        elSectionDB.classList.remove('direction-col');
        elSectionDB.classList.add('direction-row');
        const elBtnList = document.querySelector(".btn-list");
        elBtnList.innerHTML = `<img src="icons/card-interface.png" alt="card_icon">`;
        const elLists = document.querySelectorAll(".db-render ul");
        elLists.forEach((list) => {
            const elBtnDelete = list.querySelector(".btn-delete");
            const elBtnUpdate = list.querySelector(".btn-update");
            elBtnDelete.innerText = getTrans("delete");
            elBtnUpdate.innerText = getTrans("update");
            list.classList.add("list-card");
            list.classList.remove("list-list");
        });
    }
}

function onSetLang(lang) {
    setLang(lang);
    var elBody = document.querySelector('.rtl-container')
    if(lang === 'he'){
       elBody.classList.add('rtl')
    } else {
        elBody.classList.remove('rtl')
    }
    doTrans();
    renderShoes();
}

function onNextPage() {
    nextPage();
    renderShoes();
}

function onPrevPage() {
    prevPage();
    renderShoes();
}
