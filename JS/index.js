const datas = []

const allAiData = () => {
  showBtnAllAiData(6);
}
// Show all AI  
const showAllAi = (data, limiAiData) => {

  datas.push(data);

  //slice show button 
  const showBtn = document.getElementById('show-btn');
  if (limiAiData && data.length > limiAiData) {
    data = data.slice(0, limiAiData);
    showBtn.classList.remove('d-none');

  } else {
    showBtn.classList.add('d-none')
  }

  const allDataContainer = document.getElementById('allData-container');
  //----------------- get single data using forEach loop --------------
  data.forEach(singleData => {

    const { image, features, name, published_in, id } = singleData;

    allDataContainer.innerHTML += `
                <div class="col">
                <div class="">
                <img src="${image ? image : 'not available'}" class="img-fluid" style="height:300px" />
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                </div>
                <ol>
                <li>${features[1] ? features[0] : "not available"}</li>
                <li>${features[1] ? features[1] : "not available"}</li>
                <li>${features[2] ? features[2] : "not available"}</li>
                </ol>
                <div class="card-footer d-flex justify-content-between align-items-center">
                <div><h3>${name ? name : 'no found'}</h3>
                <p><i  class="fa-regular fa-calendar-days"></i> ${published_in ? published_in : "not available"}</p></div>               

                    <div class="me-2 ">

                    <i onclick="singleDataDetails('${id}')" class="fa-solid fa-arrow-right text-info " data-bs-toggle="modal" data-bs-target="#singleData"></i>
                    
                    </div>

                </div>
                </div>
            </div>             
            `
    toggleLoader(false);
  });
}
// show all  ai data btn clicked

const showBtnAllAiData = (limiAiData) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  fetch(url)
    .then(res => res.json())
    .then(data => showAllAi(data.data.tools, limiAiData));
  toggleLoader(true)
}
//    loader added
const toggleLoader = (isLoading) => {
  const loader = document.getElementById('loader');
  if (isLoading) {
    loader.classList.remove('d-none')

  } else {
    loader.classList.add('d-none')

  }

}

const singleDataDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => showSingleDataDetails(data.data));

}
// show single data details 
const showSingleDataDetails = (data) => {


  const singleAiDetails = document.getElementById('singleAiDetails');
  singleAiDetails.innerText = ''
  const { description, pricing, features, image_link, accuracy, input_output_examples, integrations } = data;
  singleAiDetails.innerHTML += `
<div class="col  shadow p-3 mb-5 bg-body rounded">
<div class="card  p-3">
  <p class="card-text fw-semibold fs-3">${description}</p>
  <div class="card-body">
    <div
      class="content d-flex justify-content-between align-items-center">

      <div  class="text-success  py-3 fw-semibold ">        
      ${pricing[0].price ? pricing[0].price : "free for cost"}<br> ${pricing[0].plan}         
      </div>
      <div  class="text-primary  py-3 fw-semibold">${pricing[1].price}<br>${pricing[1].plan} </div>
      <div  class="text-info  py-3 fw-semibold">${pricing[2].price}<br>${pricing[2].plan} </div>
    </div>
    <h5
      class="card-title d-flex justify-content-between align-items-center"
    >
      <div >
        <h3>Features</h3>
        <ul class="text-muted align-items-center">
          <li>${features[1].feature_name}</li>
          <li>${features[2].feature_name}</li>
          <li>${features[3].feature_name}</li>
        </ul>
      </div>
      <div>
        <h3>Integrations</h3>
        <ul class="text-muted">
          <li>${integrations[0] ? integrations[0] : "Not Available"}</li>
          <li>${integrations[1] ? integrations[1] : "Not Available"}</li>
          <li>${integrations[2] ? integrations[2] : "Not Available"}</li>
        </ul>
      </div>
    </h5>
  </div>
</div>
</div>

<div id="img-card"  class="col shadow p-3 mb-5 bg-body rounded">
<div  class="card  p-3">  
<div style="position: relative;">
<img src="${image_link[0]}" class="img-fluid card-img-top "   
/>
<button  id="accuracyBtn"  class=" btn btn-primary w-50  ${accuracy.score ? " " : 'd-none'}  ">${accuracy.score && (accuracy.score * 100) > 0 ? (accuracy.score * 100) + "% accuracy" : ''}</button>  
</div>
  <div class="card-body">
    <h5 class="card-title">${input_output_examples[0].input}</h5>
    <p class="card-text">
    ${input_output_examples[0].output}
     
    </p>
  </div>
</div>
</div> `

}





