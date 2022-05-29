function ai(player, enemy) {
    nexthit += 1
    // emvr = (player.x > enemy.x)
    if (enemy.x > player.x && Math.abs(enemy.x - player.x) < Math.abs(player.x - 0) + Math.abs(1024 - enemy.x)) {
        if (enemy.velx > -2) {
            enemy.velx -= 1
        }
        emvr = false
    }
    else if (enemy.x > player.x && enemy.x - player.x >= (player.x - 0) + Math.abs(1024 - enemy.x)) {
        if (enemy.velx < 2) {
            enemy.velx += 1
        }
        emvr = true
    }
    else if (enemy.x < player.x && player.x - enemy.x < Math.abs(1024 - player.x) + enemy.x) {
        if (enemy.velx < 2) {
            enemy.velx += 1
        }
        emvr = true
    }
    else if (enemy.x < player.x && player.x - enemy.x >= Math.abs(1024 - player.x) + enemy.x) {
        if (enemy.velx > -2) {
            enemy.velx -= 1
        }
        emvr = false
    }
    else if (dist(enemy.x, enemy.y, player.x, player.y) <= 50){
        enemy.velx = 0;
        cppb = 400;
    }
    enemy.x += enemy.velx;
    if (nexthit > 90) {
        if (emvr) {
            if ((enemy.x + 89 >= player.x && enemy.x + 89 <= player.x + 50) || (Math.abs(player.x - (enemy.x + 50)) < 50)) {
                setTimeout(() => {
                    if ((enemy.x + 89 >= player.x && enemy.x + 89 <= player.x + 50) || (Math.abs(player.x - (enemy.x + 50)) < 50)) {
                        cphb = 10
                        cppb = 124
                    }
                }, Math.random() * 250)
                nexthit = 0
            }
        }
        else {
            if ((enemy.x - 50 <= player.x + 50 && enemy.x - 50 >= player.x) || (Math.abs(player.x - (enemy.x - 50)) < 0)) {
                setTimeout(() => {
                    if ((enemy.x + 89 >= player.x && enemy.x + 89 <= player.x + 50) || (Math.abs(player.x - (enemy.x + 50)) < 50)) {
                        cphb = 10
                        cppb = 124
                    }
                }, Math.random() * 250)
                nexthit = 0
            }
        }
    }
}
function drawc() {
    frameRate(60);
    background("#f8f8f2"); //set the background
    image(bg, 0, 0, 1024, 600)
    noStroke(); //remove all strokes
    if (keyIsDown(65)) { //if the a key is pressed
        if (player.velx > -7) {
            player.velx -= speed; //more left
        }
        mvr = false;
    }
    else if (keyIsDown(68)) { // if the d key is pressed
        if (player.velx < 7) {
            player.velx += speed; //move right
        }
        mvr = true;
    }
    else {
        player.velx = 0;
    }
    if ((keyIsDown(32) || keyIsDown(87)) && jumpart == 0 && player.y >= 474) {
        inJump = true;
        jumpart = 1;
    }
    if (keyIsDown(38) && jumpart == 0 && enemy.y >= 474) {
        einJump = true;
        ejumpart = 1;
    }
    console.log(twoplayer)
    if (inJump && jumpart < jumpmax) {
        player.vely -= jumpart * 22
        jumpart += 9
    }
    else if (inJump && jumpart >= jumpmax) {
        inJump = false;
        jumpart = 0;
    }
    if (!inJump && player.y + player.vely <= 474) {
        player.vely += 1;
    }
    else if (!inJump && player.y <= 474 && player.y + player.vely > 474) {
        player.y = Math.floor(player.y);
        player.vely = 1;
    }
    else if (!inJump) {
        player.vely = 0;
    }
    if (twoplayer){
        if (keyIsDown(LEFT_ARROW)) {
            if (enemy.velx > -7) {
                enemy.velx -= 1
            }
            emvr = false
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            if (enemy.velx < 7) {
                enemy.velx += 1
            }
            emvr = true;
        }
        else {
            enemy.velx = 0;
        }
        if (einJump && ejumpart < jumpmax) {
            enemy.vely -= ejumpart * 22
            ejumpart += 9
        }
        else if (einJump && ejumpart >= jumpmax) {
            einJump = false;
            ejumpart = 0;
        }
        if (!einJump && enemy.y + enemy.vely <= 474) {
            enemy.vely += 1;
        }
        else if (!einJump && enemy.y <= 474 && enemy.y + enemy.vely > 474) {
            enemy.y = Math.floor(enemy.y);
            enemy.vely = 1;
        }
        else if (!einJump) {
            enemy.vely = 0;
        }
    }
    else{
        ai(player, enemy);
    }
    player.y += player.vely
    player.x += player.velx
    enemy.x += enemy.velx
    enemy.y += enemy.vely
    // if (Math.abs(enemy.x - player.x) > 150){ //if the distance between the two enemies is greater than 150 pixels
    //     if (enemy.x > player.x){ //check if the enemy is on the right of the player or the left
    //         enemy.x -= speed/1.6; //if the enemy is on the right of the player, make the enemy more left toward the player
    //     }
    //     else{ //if the enemy is on the left of the player
    //         enemy.x += speed/1.6; //make the enemy more right toward the player
    //     }
    // }
    if (player.x < 0) { //if the player has gone too far to the left make it wrap around and go to the right
        player.x = 1000; //make it go to the right
    }
    else if (player.x > 1024) { //if the player has gone too far to the right
        player.x = 24; //make it wrap and go to the left
    }
    if (enemy.x < 0) { //if the player has gone too far to the left make it wrap around and go to the right
        enemy.x = 1000; //make it go to the right
    }
    else if (enemy.x > 1024) { //if the player has gone too far to the right
        enemy.x = 24; //make it wrap and go to the left
    }
    stroke(0.7); //create stroke
    noFill(); //make border empty
    rect(player.x - 25, player.y - 25, 102, 6, 8) //create border for player health bar
    rect(enemy.x - 25, enemy.y - 25, 102, 6, 8) //create border for enemy health bar
    noStroke(); //disable strokes
    if (player.health <= 100 && player.health > 80) { //if the health is between 85 and 100, the color should be green
        fill("#63ff87"); //make the color green
    }
    else if (player.health <= 80 && player.health > 40) { //if the health is between 30 and 85, the color should be yellow
        fill("#e1ed00") //make the color yellow
    }
    else { //if the health is between 30-
        fill("#ff7575") //make the color red
    }
    rect(player.x - 24, player.y - 24.5, player.health, 5, 8) //draw the player's health bar
    if (enemy.health <= 100 && enemy.health > 80) { //if the health is between 85 and 100, the color should be green
        fill("#63ff87"); //make the color green
    }
    else if (enemy.health <= 80 && enemy.health > 40) { //if the health is between 30 and 85, the color should be yellow
        fill("#e1ed00") //make the color yellow
    }
    else { //if the health is between 30-
        fill("#ff7575") //make the color red
    }
    if (player.health < 0) {
        player.health = 0
    }
    if (enemy.health < 0) {
        enemy.health = 0
    }
    // if (inJump && !einJump) {
    //     setTimeout(() => {
    //         einJump = true;
    //         ejumpart = 1;
    //     }, 150);
    // }
    rect(enemy.x - 24, enemy.y - 24.5, enemy.health, 5, 8) //draw the enemy's health bar
    fill("skyblue"); //set the color to skyblue
    rect(player.x, player.y, 50, 52); //render the player
    fill("#1e1e1e");
    fill("crimson"); //set the color to crimson
    rect(enemy.x, enemy.y, 50, 52); //render the enemy
    if (mvr) {
        image(img, player.x + 50, player.y + 5, 50, 40); //draw the players sword
    }
    else {
        image(imgl, player.x - 50, player.y - 5, 50, 60)
    }
    if (emvr) {
        image(img, enemy.x + 50, enemy.y + 5, 50, 40); //draw the enemy's sword
    }
    else {
        image(imgl, enemy.x - 50, enemy.y - 5, 50, 60)
    }
    fslh += 1
    if (fslh >= 2) {
        text("can hit", 10, 20);
    }
    else {
        text("no hit", 10, 20);
    }
    if (combo) {
        fill("black");
        rect(30, 40, 120, 60);
        fill("red");
        textSize(20);
        text("COMBO!!", 44, 70);
        textSize(12);
    }
    if (cehb) {
        enemy.health -= 1
        cehb -= 1
    }
    if (cphb) {
        player.health -= 1
        cphb -= 1
    }
    if (cepb) {
        if (cepb > 0) {
            if (cepb > 114) {
                enemy.x += 12
                cepb -= 12
            }
            else {
                enemy.x += 4
                cepb -= 4
            }
        }
        else {
            enemy.x -= 4
            cepb += 4
        }
    }
    if (cppb) {
        if (cppb > 0) {
            if (cppb > 114) {
                player.x += 12
                cppb -= 12
            }
            else {
                player.x += 4
                cppb -= 4
            }
        }
        else {
            player.x -= 4
            cppb += 4
        }
    }
}
function keyPressed() {
    if (mvr) {
        if (keyIsDown(69) && fslh >= 45 && ((player.x + 89 >= enemy.x && player.x + 89 <= enemy.x + 50) || (Math.abs(enemy.x - (player.x + 50)) < 50))) {
            fslh = 0
            if (combo) {
                cehb = 50
                cepb += 312
                combo = false;
            }
            else {
                cehb = 10
                cepb += 112
            }

        }
    }
    else {
        if (keyIsDown(69) && fslh >= 45 && ((player.x - 89 >= enemy.x && player.x - 89 <= enemy.x + 50) || (Math.abs(enemy.x - (player.x - 50)) < 50))) {
            fslh = 0
            if (combo) {
                cehb = 50
                combo = false;
            }
            else {
                cehb = 10
            }
        }
    }
    if (emvr) {
        if (keyIsDown(16) && ((enemy.x + 89 >= player.x && enemy.x + 89 <= player.x + 50) || (Math.abs(player.x - (enemy.x + 50)) < 50))) {
            cphb = 10
            cppb = 124
            nexthit = 0
        }
    }
    else {
        if (keyIsDown(16) && ((enemy.x - 50 <= player.x + 50 && enemy.x - 50 >= player.x) || (Math.abs(player.x - (enemy.x - 50)) < 0))) {
            cphb = 10
            cppb = -124
            nexthit = 0
        }
    }
    nd = new Date();
    lastkeys.push([key, nd]);
    lk = []
    oh = false;
    if (lastkeys.length > 5) {
        oh = true;
        lk = lastkeys.slice(-6, lastkeys.length)
        for (i = 0; i < lk.length; i++) {
            if (!(lk[i][0] == "e")) {
                oh = false;
                break;
            }
        }
    }
    if (oh) {
        lastkeys = []
        s = lk[0]
        t = lk.at(-1)
        if (t[1] - s[1] < 5000) {
            combo = true;
        }
        oh = false;
    }

}