/* jquery-ui를 사용하게됨으로써 사용하지 않게된 dragElement함
	function dragElement(elmnt) {
	  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	  elmnt.onmousedown = dragMouseDown;

	  function dragMouseDown(e) {
	    e = e || window.event;
	    e.preventDefault();
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    document.onmouseup = closeDragElement;
	    document.onmousemove = elementDrag;
	  }
	  function elementDrag(e) {
	    e = e || window.event;
	    e.preventDefault();
	    pos1 = pos3 - e.clientX;
	    pos2 = pos4 - e.clientY;
	    pos3 = e.clientX;
	    pos4 = e.clientY;
	    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	  }
	  function closeDragElement() {
	    document.onmouseup = null;
	    document.onmousemove = null;
	  }
	}
*/
	$(document).ready(function() {
		document.querySelector('#save').addEventListener('click', function() {
			html2canvas(document.querySelector('#mainbox'), {
		  	onrendered: function(canvas) {
		      return Canvas2Image.saveAsPNG(canvas);
		    }
		 	});
		});


	var zidx = 10;
	$("#for1").click(function(){
		$("#innermain").append($('<img src="./img/forest_rot1.png"></img>').draggable().
		css("cursor", "move").click(clickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}))
	});
	$("#for2").click(function(){
		$("#innermain").append($('<img src="./img/forest_rot2.png"></img>').draggable().
		css("cursor", "move").click(clickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}))
	});
	$("#for3").click(function(){
		$("#innermain").append($('<img src="./img/forest_rot3.png"></img>').draggable().
		css("cursor", "move").click(clickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}))
	});
	$("#for4").click(function(){
		$("#innermain").append($('<img src="./img/forest_rot4.png"></img>').draggable().
		css("cursor", "move").click(clickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}))
	});
	$("#for5").click(function(){
		$("#innermain").append($('<img src="./img/princess_run_side.gif" width="80px"></img>').draggable().
		css("cursor", "move").click(clickimg).contextmenu(dbclickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}))
	});

	$("#delete").click(function(){
		$("#innermain").children().remove();
	});
	$("#cancel").click(function(){
		$("#innermain").children().last().remove();
	});

	function printmenu(){
		$(this).css("color", "red");
	}

	$("#mainbox").resizable();

	function appendimg(){
		$("#innermain").append($('<img src="./img/princess_run_side.gif" width="80px"></img>').draggable().
		css("cursor", "move").click(clickimg).mousedown(function(){
			$(this).css('z-index', zidx);
			zidx++;
		}));
	}



	var toggle = 0;
	function clickimg() {
	toggle++;
		  if (toggle==1){
	    $(this).css( {'transform': 'rotate(90deg)'});
		  }
			else if (toggle==2){
	    $(this).css( {'transform': 'rotate(180deg)'});
		  }
			else if (toggle==3){
	    $(this).css( {'transform': 'rotate(270deg)'});
		  }
		  else if (toggle==4){
	    $(this).css({'transform': 'rotate(0deg)'});
			toggle = 0;
		  }
	}

	function dbclickimg(){
		alert($(this).css("transform"));
		$(this).css({'transform': 'scaleX(-1)'})
	}

$("#changebg").click(function (){
	$("#selectdiv").css({'z-index': '999'});
});



});
