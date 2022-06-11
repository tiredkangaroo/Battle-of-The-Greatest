b = createButton("Play against a friend");
b.position(383, 228);
b.size(240, 70);
b.id("playbutton");
b.mouseClicked(() => {
    playing = true;
    twoplayer = true;
    document.body.removeChild(document.getElementById("playbuttonai"));
    document.body.removeChild(document.getElementById("playbutton"));
})
m = createButton("Play against the AI");
m.position(383, 338);
m.size(240, 70);
m.id("playbuttonai")
m.mouseClicked(() => {
    playing = true;
    twoplayer = false;
    document.body.removeChild(document.getElementById("playbuttonai"));
    document.body.removeChild(document.getElementById("playbutton"));
})

b = document.getElementById("playbutton");
b.style.background = "#ffc670"
b.style.border = "none"
b.style.borderRadius = "8px"
m = document.getElementById("playbuttonai");
m.style.background = "#94ffa2"
m.style.border = "none"
m.style.borderRadius = "8px"
