const mp = new MercadoPago('APP_USR-8fb981bb-a5d4-4f1d-824b-d08c94c83581', {
    locale: 'es-CO',
});

document.getElementById('checkout-btn').addEventListener('click', async () => {
    try {
        const orderData = {
            title: document.querySelector(".name").innerText,
            quantity: 1,
            unit_price: 100,
            currency_id: 'COL',
          
        };
        console.log('Datos de la orden:', orderData);

        const response = await fetch('http://localhost:3000/preference', {

            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(orderData),        
        });
        
        console.log("Datos del response " + response);

            const preference = await response.json();
            console.log('Preferencia de pago:', preference);
            createCheckoutButton(preference.id);
        } catch (error) {
            console.error('Error al parsear la respuesta JSON del servidor:', error);
            alert('Error al obtener la preferencia del servidor');
        }

});


const createCheckoutButton = (preferenceId) => {
 const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };
    renderComponent();
};


