// Initialize webGL
const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer( {canvas:canvas, antialias:true} );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('rgb(0,0,0)');    // set background color

// Create a new Three.js scene with camera and light
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, canvas.width / canvas.height, 0.1, 1000 );
camera.position.set( 0, 35, 0.2 );
camera.lookAt(scene.position);   // camera looks at origin

const ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

const clockGeo = new THREE.CylinderGeometry(25, 25, 3, 250, 250);
const clockMat = new THREE.MeshBasicMaterial({color:"white"});
const clock = new THREE.Mesh(clockGeo, clockMat);
scene.add(clock);

const clockCenter = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 6, 250, 250), new THREE.MeshBasicMaterial({color:0x3A0000}));
scene.add(clockCenter);

// Clock tick
const tickGeo = new THREE.BoxGeometry(1, 1, 1);
const tickMat = new THREE.MeshBasicMaterial({color:0x000000});
const tick = new THREE.Mesh(tickGeo, tickMat);

const twelveTick = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color:0x83A9A9}));

const armHoursMainSide = new THREE.Mesh(new THREE.BoxGeometry( 0.8, 0.8, 12), new THREE.MeshBasicMaterial({color:"black"}));
const armMinutesMainSide = new THREE.Mesh(new THREE.BoxGeometry( 0.5, 0.5, 17), new THREE.MeshBasicMaterial({color:"black"}));
const armSecondsMainSide = new THREE.Mesh(new THREE.BoxGeometry( 0.3, 0.3, 15), new THREE.MeshBasicMaterial({color:"black"}));
clock.add(armHoursMainSide);
clock.add(armMinutesMainSide);
clock.add(armSecondsMainSide);

const armHoursBackSide = armHoursMainSide.clone();// new city´s clock
const armMinutesBackSide = armMinutesMainSide.clone();// new city´s clock
const armSecondsBackSide = armSecondsMainSide.clone();// new city´s clock
clock.add(armHoursBackSide);
clock.add(armMinutesBackSide);
clock.add(armSecondsBackSide);

createTicks(1.5);
createTicks(-1.5);

clock.add(clockCenter);

function createTicks(location) {
    let tempTick;
    for (let k=0; k<60; k++) {
        const degrees = ((Math.PI*2)/60) * k;
        if (k === 30) {
            tempTick = twelveTick.clone();
        } else {
            tempTick = tick.clone();
        }

        let remainder = k % 5;
        if (remainder === 0){
            tempTick.scale.set( 0.5 , 0.5, 4);
        }else{
            tempTick.scale.set( 0.5 , 0.5, 0.5);
        }
        clock.add(tempTick);
        tempTick.position.x = 22 * Math.sin(degrees);
        tempTick.position.z = 22 * Math.cos(degrees);
        tempTick.position.y = location;
        tempTick.rotation.y = degrees;
    }
}

const controls = new THREE.TrackballControls( camera, canvas );

function render() {
    update();
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

function update() {
    const time = new Date();
    const hours = time.getHours()%12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    updateTimeMainSide(hours , minutes ,seconds);
    updateTimeBackSide(hours , minutes ,seconds);
}

function updateTimeMainSide(hours , minutes, seconds){
    armHoursMainSide.rotation.y = ((((Math.PI*2)/12) * hours) * (-1)) - Math.PI;
    armHoursMainSide.position.y = 2;
    armHoursMainSide.position.z = (12/2) * Math.cos(((((Math.PI * 2)/12) * hours) * (-1)) - Math.PI);
    armHoursMainSide.position.x = (12/2) * Math.sin(((((Math.PI * 2)/12) * hours) * (-1)) - Math.PI);

    armMinutesMainSide.rotation.y = ((((Math.PI*2)/60) * minutes) * (-1)) - Math.PI;
    armMinutesMainSide.position.y = 2;
    armMinutesMainSide.position.z = (17/2)*Math.cos(((((Math.PI*2)/60) * minutes) * (-1)) - Math.PI);
    armMinutesMainSide.position.x = (17/2)*Math.sin(((((Math.PI*2)/60) * minutes) * (-1)) - Math.PI);

    armSecondsMainSide.rotation.y = ((((Math.PI*2)/60) * seconds) * (-1)) - Math.PI;
    armSecondsMainSide.position.y = 2;
    armSecondsMainSide.position.z = (15/2) * Math.cos(((((Math.PI*2)/60) * seconds) * (-1)) - Math.PI);
    armSecondsMainSide.position.x = (15/2) * Math.sin(((((Math.PI*2)/60) * seconds) * (-1)) - Math.PI);
}

function updateTimeBackSide(hours , minutes, seconds){
    armHoursBackSide.rotation.y = ((((Math.PI*2)/12) * hours + 5)) - Math.PI;
    armHoursBackSide.position.y = -2;
    armHoursBackSide.position.z = (12/2) * Math.cos(((((Math.PI*2)/12) * hours + 5)) - Math.PI);
    armHoursBackSide.position.x = (12/2) * Math.sin(((((Math.PI*2)/12) * hours + 5)) - Math.PI);

    armMinutesBackSide.rotation.y = ((((Math.PI*2)/60) * minutes)) - Math.PI;
    armMinutesBackSide.position.y = -2;
    armMinutesBackSide.position.z = (17/2) * Math.cos(((((Math.PI*2)/60) * minutes)) - Math.PI);
    armMinutesBackSide.position.x = (17/2) * Math.sin(((((Math.PI*2)/60) * minutes)) - Math.PI);

    armSecondsBackSide.rotation.y = ((((Math.PI*2)/60) * seconds)) - Math.PI;
    armSecondsBackSide.position.y = -2;
    armSecondsBackSide.position.z = (15/2) * Math.cos(((((Math.PI*2)/60) * seconds)) - Math.PI);
    armSecondsBackSide.position.x = (15/2) * Math.sin(((((Math.PI*2)/60) * seconds)) - Math.PI);
}

render();
