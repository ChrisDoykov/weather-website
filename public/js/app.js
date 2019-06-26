const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const paragraphOne = document.getElementById('para1');
const paragraphTwo = document.getElementById('para2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;

    paragraphOne.textContent = 'Loading...';
    paragraphTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then(data => {
            if (data.error) {
                paragraphOne.textContent = data.error;
                paragraphTwo.textContent = '';
            } else {
                paragraphOne.textContent = data.location;
                paragraphTwo.textContent = data.forecast.summary + 'It is currently '
                    + data.forecast.temperature + ' with a '
                    + data.forecast.rainChance + '% chance of rain.';
            }
        })
    })

})