function initElement()
{
  let score = 0;
  var p = document.getElementById("hitbox");
  var scoredom = document.getElementById("scorevalue");
  p.addEventListener('click', event => {
    score += 1;
    var e = window.event;
    var posX = e.pageX;
    var posY = e.pageY;
  let img = document.createElement('img');
  img.src = "wota.gif";
  img.style.height = '10%';
  img.style.top = (posY-100-380)+"px";
  img.style.left = (posX-100-380)+"px";
  p.appendChild(img);
  scoredom.innerHTML = score;
  setTimeout(() => p.removeChild(img), 350);
});
};


function showAlert()
{
  alert("Evènement de click détecté");
}
