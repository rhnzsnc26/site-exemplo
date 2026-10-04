let cart = [];

let currentProduct = null;

let selectedSize = null;

let quantity = 1;


/* ELEMENTOS */

const productModal = document.querySelector("#productModal");

const modalImage = document.querySelector("#modalImage");

const modalName = document.querySelector("#modalName");

const modalDescription = document.querySelector("#modalDescription");

const modalPrice = document.querySelector("#modalPrice");

const closeModal = document.querySelector("#closeModal");

const addCart = document.querySelector("#addCart");

const quantityDisplay = document.querySelector("#quantity");

const selectedSizeDisplay = document.querySelector("#selectedSize");

const cartPanel = document.querySelector("#cartPanel");

const cartButton = document.querySelector("#cartButton");

const closeCart = document.querySelector("#closeCart");

const overlay = document.querySelector("#overlay");

const cartItems = document.querySelector("#cartItems");

const cartTotal = document.querySelector("#cartTotal");

const cartCount = document.querySelector("#cartCount");

const checkout = document.querySelector("#checkout");


/* FORMATAR PREÇO */

function formatPrice(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* ABRIR PRODUTO */

function openProduct(product) {

    currentProduct = product;

    selectedSize = null;

    quantity = 1;

    modalImage.src = product.image;

    modalImage.alt = product.name;

    modalName.textContent = product.name;

    modalDescription.textContent = product.description;

    modalPrice.textContent = formatPrice(product.price);

    quantityDisplay.textContent = quantity;

    selectedSizeDisplay.textContent = "Selecione um tamanho";

    document.querySelectorAll(".size").forEach(function (button) {

        button.classList.remove("selected");

    });

    productModal.classList.add("open");

    document.body.classList.add("no-scroll");

}


/* FECHAR PRODUTO */

function closeProduct() {

    productModal.classList.remove("open");

    document.body.classList.remove("no-scroll");

}


/* CLICAR NOS PRODUTOS */

document.querySelectorAll(".product").forEach(function (product) {

    product.addEventListener("click", function () {

        const productData = {

            name: product.dataset.name,

            price: Number(product.dataset.price),

            image: product.dataset.image,

            description: product.dataset.description

        };

        openProduct(productData);

    });

});


/* FECHAR MODAL */

closeModal.addEventListener("click", closeProduct);


/* CLICAR FORA DO MODAL */

productModal.addEventListener("click", function (event) {

    if (event.target === productModal) {

        closeProduct();

    }

});


/* TAMANHOS */

document.querySelectorAll(".size").forEach(function (button) {

    button.addEventListener("click", function () {

        document.querySelectorAll(".size").forEach(function (sizeButton) {

            sizeButton.classList.remove("selected");

        });

        button.classList.add("selected");

        selectedSize = button.textContent;

        selectedSizeDisplay.textContent =
            "Tamanho selecionado: " + selectedSize;

    });

});


/* QUANTIDADE */

document.querySelector("#increase").addEventListener("click", function () {

    quantity++;

    quantityDisplay.textContent = quantity;

});


document.querySelector("#decrease").addEventListener("click", function () {

    if (quantity > 1) {

        quantity--;

        quantityDisplay.textContent = quantity;

    }

});


/* ADICIONAR AO CARRINHO */

addCart.addEventListener("click", function () {

    if (!selectedSize) {

        selectedSizeDisplay.textContent =
            "Escolha um tamanho antes de continuar.";

        return;

    }


    const existingItem = cart.find(function (item) {

        return (
            item.name === currentProduct.name &&
            item.size === selectedSize
        );

    });


    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({

            name: currentProduct.name,

            price: currentProduct.price,

            image: currentProduct.image,

            size: selectedSize,

            quantity: quantity

        });

    }


    updateCart();

    closeProduct();

    openCart();

});


/* ATUALIZAR CARRINHO */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Seu carrinho está vazio.</p>';

        cartTotal.textContent = "R$ 0,00";

        cartCount.textContent = "0";

        return;

    }


    let total = 0;

    let count = 0;


    cart.forEach(function (item, index) {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div>

                <h3>${item.name}</h3>

                <p>
                    Tamanho: ${item.size}
                </p>

                <p>
                    Quantidade: ${item.quantity}
                </p>

                <p>
                    ${formatPrice(item.price * item.quantity)}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = formatPrice(total);

    cartCount.textContent = count;


    document.querySelectorAll(".remove-item").forEach(function (button) {

        button.addEventListener("click", function () {

            const index = Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


/* ABRIR CARRINHO */

function openCart() {

    cartPanel.classList.add("open");

    overlay.classList.add("active");

}


/* FECHAR CARRINHO */

function closeCartPanel() {

    cartPanel.classList.remove("open");

    overlay.classList.remove("active");

}


/* BOTÃO CARRINHO */

cartButton.addEventListener("click", openCart);


/* FECHAR CARRINHO */

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


/* FINALIZAR PEDIDO */

checkout.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }


    alert(
        "Pedido simulado com sucesso!\n\n" +
        "O checkout real poderá ser conectado a um sistema de pagamento futuramente."
    );

});


/* FILTROS */

document.querySelectorAll(".filter").forEach(function (filterButton) {

    filterButton.addEventListener("click", function () {

        document.querySelectorAll(".filter").forEach(function (button) {

            button.classList.remove("active");

        });

        filterButton.classList.add("active");


        const filter = filterButton.dataset.filter;


        document.querySelectorAll(".product").forEach(function (product) {

            if (
                filter === "all" ||
                product.dataset.category === filter
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


/* NEWSLETTER */

const newsletterForm =
    document.querySelector("#newsletterForm");

const emailInput =
    document.querySelector("#emailInput");

const formMessage =
    document.querySelector("#formMessage");


newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!emailInput.value) {

        return;

    }


    formMessage.textContent =
        "Cadastro realizado. Obrigado por fazer parte da .";

    emailInput.value = "";

});


/* ESC PARA FECHAR */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeProduct();

        closeCartPanel();

    }

});


/* INICIALIZAÇÃO */

updateCart();