const API_URL = '/api';

async function postImage(img, address)
{
    const response = await fetch(address, {
        method: 'POST',
        headers: {
          'Content-Type':  'multipart/form-data', //img.type
        },
        body: img,
//        files: { 'image': img },
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
    }
}

async function imageFile(event,selectedFile)
{
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

    const address = event.target.querySelector('.file_sendTo').value;
    console.log(address);
    var newBorder;
    try{
         newBorder = await postImage(formData, address);
         console.log(newBorder);
    }
    catch(error){
         console.log(error);
    }
    finally{
        var newBorder = {
          labels: [
            {
              class: 24,
              confidence: 0.33163750171661377,
              name: "backpack",
              xmax: 728,
              xmin: 32,
              ymax: 596,
              ymin: 275
            },
            {
              class: 26,
              confidence: 0.2580671012401581,
              name: "handbag",
              xmax: 418,
              xmin: 132,
              ymax: 397,
              ymin: 175
            }
          ]
        };
    }

    const getColor = function(str) {
    // str = 0.33163750171661377
     str+="";str=str.split(".").pop();
     var arr = chunkSubstr(str,Math.floor(str.length/3));
     return `rgb(${256/arr[0]*20000<<0}, ${256/arr[1]*20000<<0}, ${256/arr[2]*20000<<0})`;
    }
    const chunkSubstr = function (str, size) {
      const numChunks = Math.ceil(str.length / size)
      const chunks = new Array(numChunks)

      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substr(o, size)
      }

      return chunks
    }

    var yolo_image = document.querySelector('.yolo_image');
    const getHash = function (str) {
      var hash = 0;
      var str = String(str);
      if (str.length == 0) return hash;
      for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
    }
    const addNewRect = function(obj) {
      var id = 'rect'+getHash(JSON.stringify(obj));
      var rect = document.createElement("div");
      rect.innerHTML = "<h4 class='sign'>"+obj.name+"</h4>";
      rect.classList.add('rect');
      rect.id = id;
      yolo_image.appendChild(rect);
      return id;
    };

    const setCords = function(rect_id,label) {
      var rect = document.querySelector("#"+rect_id);
      var image = yolo_image.querySelector("img");
      var width = (label.xmax-label.xmin);
      var height = (label.ymax-label.ymin);
      console.log(width,image.naturalWidth,(width / image.naturalWidth),(label.xmin / image.naturalWidth));

      rect.style.width = (width / image.naturalWidth)*100 + '%';
      rect.style.height = (height / image.naturalHeight)*100 + '%';

      rect.style.left = (label.xmin / image.naturalWidth)*100 + '%';
      rect.style.top = (label.ymin / image.naturalHeight)*100 + '%';

      rect.style.borderColor = getColor(label.confidence);
    }

    newBorder.labels.forEach( function(label){
      var rect_id = addNewRect(label);
      setCords(rect_id,label);
    });

}
async function audioFile(event, selectedFile)
{
    const address = event.target.querySelector('.file_sendTo').value;


    let socket = new WebSocket(address);



}

async function handleFileFormSubmit(event) {
    event.preventDefault();
    const selectedFile = event.target.querySelector('.file_input').files[0];
    console.log(selectedFile);
    if (selectedFile.type.startsWith('image/') ){
        imageFile(event, selectedFile)
    }
    if (selectedFile.type.startsWith('audio/')){
        audioFile(event, selectedFile)
    }

}

function init(){
    const formNodes = document.querySelectorAll('.file_form');
    Array.from(formNodes).forEach( function(el) {el.addEventListener('submit', handleFileFormSubmit)});
}

init();