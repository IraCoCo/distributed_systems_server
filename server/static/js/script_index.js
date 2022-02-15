const API_URL = '/api';

async function postImage(img, address)
{
    const response = await fetch(address, {
        method: 'POST',
        headers: {
          'Content-Type': img.type
        },
        mode: 'no-cors',
        body: img,
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

async function handleFileFormSubmit(event) {
    event.preventDefault();
    const selectedFile = event.target.querySelector('.file_input').files[0];
    console.log(selectedFile);
    if (!selectedFile.type.startsWith('image/')){
        return // очистка или сообщение
    }
    const formData = new FormData()
    formData.append('image', selectedFile)

    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = selectedFile;
    const yoloImg = document.querySelector('.yolo_image');
    yoloImg.replaceChildren(img); // это div, в котором будет отображаться содержимое.

    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(selectedFile);

    console.log(formData);
    const address = event.target.querySelector('.file_sendTo').value;
    console.log(address);
    try{
         const newBorder = await postImage(selectedFile, address);
         console.log(newBorder);
    }
    catch(error){
         console.log(error);
    }
    finally{

    }
}

function init(){
    const formNodes = document.querySelectorAll('.file_form');
    Array.from(formNodes).forEach( function(el) {el.addEventListener('submit', handleFileFormSubmit)});
}

init();