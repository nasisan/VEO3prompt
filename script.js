document.addEventListener('DOMContentLoaded', () => {
    const cameraMovementSelect = document.getElementById('camera-movement');
    const generatePromptBtn = document.getElementById('generate-prompt-btn');
    const nextSceneBtn = document.getElementById('next-scene-btn');
    const newStoryBtn = document.getElementById('new-story-btn');
    const changeStyleBtn = document.getElementById('change-style-btn');
    const changeTitleBtn = document.getElementById('change-title-btn');

    const promptIdContainer = document.getElementById('prompt-id');
    const promptEnContainer = document.getElementById('prompt-en');
    const initialPromptExampleContainer = document.getElementById('initial-prompt-example');

    const cameraMovements = {
        "Static": "Statis (Kamera diam)",
        "Pan Left": "Geser Kiri (Pan Left)",
        "Pan Right": "Geser Kanan (Pan Right)",
        "Tilt Up": "Miring ke Atas (Tilt Up)",
        "Tilt Down": "Miring ke Bawah (Tilt Down)",
        "Zoom In": "Perbesar (Zoom In)",
        "Zoom Out": "Perkecil (Zoom Out)",
        "Dolly In": "Dolly Masuk (Dolly In)",
        "Dolly Out": "Dolly Keluar (Dolly Out)",
        "Tracking Shot": "Tracking Shot (Mengikuti objek)",
        "Crane Up": "Crane Naik",
        "Crane Down": "Crane Turun",
        "Handheld": "Genggam (Handheld)",
        "Drone Shot": "Tangkapan Drone (Drone Shot)",
        "3D Rotation": "Rotasi 3D",
        "Roll": "Putar (Roll)",
        "Vertigo/Dolly Zoom": "Vertigo/Dolly Zoom",
        "Whip Pan": "Whip Pan (Geser Cepat)",
        "Crash Zoom": "Crash Zoom (Perbesar Cepat)",
        "Slow Zoom": "Slow Zoom (Perbesar Lambat)"
    };

    // Populate camera movements dropdown
    for (const key in cameraMovements) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${key} (${cameraMovements[key]})`;
        cameraMovementSelect.appendChild(option);
    }

    const initialPrompt = {
        sceneTitle: "Terminal bus malam",
        characterDesc: "Seorang vlogger wanita muda asal Minang berusia 27 tahun.\nPerawakan/Bentuk Tubuh: tubuh mungil, tinggi 158cm, bentuk badan proporsional.\nWarna kulit: sawo matang cerah.\nRambut: ikal sebahu, hitam kecokelatan, diikat setengah ke belakang.\nWajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural dengan sentuhan lip tint.\nPakaian: mengenakan jaket parasut warna kuning mustard dan celana panjang hitam, membawa ransel kecil.",
        characterVoice: "Dia berbicara dengan suara wanita muda yang hangat dan penuh semangat.\nNada: mezzo-soprano.\nTimbre: bersahabat dan enerjik.\nAksen/Logat: logat Indonesia dengan sentuhan khas Minang halus, berbicara murni dalam Bahasa Indonesia.\nCara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.\nPENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.",
        characterAction: "berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.",
        characterExpression: "Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.",
        setting: "latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.\nWaktu: malam hari, hujan rintik-rintik.",
        visualDetails: "Pencahayaan: natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.\nGaya Video/Art Style: cinematic realistis.\nKualitas Visual: Resolusi 4K.",
        overallAtmosphere: "Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.",
        soundAmbience: "SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.",
        characterDialogue: 'DIALOG dalam Bahasa Indonesia: Karakter berkata: "Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai."',
        negativePrompt: "Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah."
    };
    
    // Function to set initial values
    function setInitialValues() {
        document.getElementById('scene-title').value = initialPrompt.sceneTitle;
        document.getElementById('character-desc').value = initialPrompt.characterDesc;
        document.getElementById('character-voice').value = initialPrompt.characterVoice;
        document.getElementById('character-action').value = initialPrompt.characterAction;
        document.getElementById('character-expression').value = initialPrompt.characterExpression;
        document.getElementById('setting').value = initialPrompt.setting;
        document.getElementById('visual-details-extra').value = initialPrompt.visualDetails;
        document.getElementById('overall-atmosphere').value = initialPrompt.overallAtmosphere;
        document.getElementById('sound-ambience').value = initialPrompt.soundAmbience;
        document.getElementById('character-dialogue').value = initialPrompt.characterDialogue;
        document.getElementById('negative-prompt').value = initialPrompt.negativePrompt;
        cameraMovementSelect.value = "Tracking Shot";
        displayInitialExample();
    }

    function displayInitialExample() {
        const prompt = `PROMPT KARAKTER KONSISTEN VEO3

[JUDUL SCENE: ${initialPrompt.sceneTitle}]
[DESKRIPSI KARAKTER INTI]
${initialPrompt.characterDesc}
[DETAIL SUARA KARAKTER]
${initialPrompt.characterVoice}
[AKSI KARAKTER]
${initialPrompt.characterAction}
[EKSPRESI KARAKTER]
${initialPrompt.characterExpression}
[LATAR TEMPAT & WAKTU]
${initialPrompt.setting}
[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: kamera tracking shot dari belakang karakter lalu menyamping dan ke depan, mengikuti langkahnya secara sinematik.
${initialPrompt.visualDetails}
[SUASANA KESELURUHAN]
${initialPrompt.overallAtmosphere}
[SUARA LINGKUNGAN (AMBIENCE)]
${initialPrompt.soundAmbience}
[DIALOG KARAKTER]
${initialPrompt.characterDialogue}
[NEGATIVE PROMPT]
${initialPrompt.negativePrompt}`;
        initialPromptExampleContainer.textContent = prompt;
    }

    function generatePrompt() {
        const sceneTitle = document.getElementById('scene-title').value;
        const characterDesc = document.getElementById('character-desc').value;
        const characterVoice = document.getElementById('character-voice').value;
        const characterAction = document.getElementById('character-action').value;
        const characterExpression = document.getElementById('character-expression').value;
        const setting = document.getElementById('setting').value;
        const cameraMovement = cameraMovementSelect.value;
        const visualDetailsExtra = document.getElementById('visual-details-extra').value;
        const overallAtmosphere = document.getElementById('overall-atmosphere').value;
        const soundAmbience = document.getElementById('sound-ambience').value;
        const characterDialogue = document.getElementById('character-dialogue').value;
        const negativePrompt = document.getElementById('negative-prompt').value;

        const dialogueOnly = characterDialogue.replace(/DIALOG dalam Bahasa Indonesia: Karakter berkata: /i, "").trim();

        const idPrompt = `[JUDUL SCENE: ${sceneTitle}]
[DESKRIPSI KARAKTER INTI]
${characterDesc}
[DETAIL SUARA KARAKTER]
${characterVoice}
[AKSI KARAKTER]
${characterAction}
[EKSPRESI KARAKTER]
${characterExpression}
[LATAR TEMPAT & WAKTU]
${setting}
[DETAIL VISUAL TAMBAHAN]
Gerakan Kamera: ${cameraMovement} (${cameraMovements[cameraMovement]})
${visualDetailsExtra}
[SUASANA KESELURUHAN]
${overallAtmosphere}
[SUARA LINGKUNGAN (AMBIENCE)]
${soundAmbience}
[DIALOG KARAKTER]
${characterDialogue}
[NEGATIVE PROMPT]
${negativePrompt}`;

        const enPrompt = `[SCENE TITLE: ${sceneTitle}]
[CORE CHARACTER DESCRIPTION]
A 27-year-old young female vlogger from Minang.
Physique/Body Shape: petite body, 158cm tall, proportional body shape.
Skin color: bright tan.
Hair: shoulder-length wavy, brownish-black, tied half back.
Face: oval face, natural thick eyebrows, large black eyes, friendly smile, rosy cheeks, natural lips with a touch of lip tint.
Clothing: wearing a mustard yellow parachute jacket and black long pants, carrying a small backpack.
[CHARACTER VOICE DETAILS]
She speaks with a warm and enthusiastic young woman's voice.
Tone: mezzo-soprano.
Timbre: friendly and energetic.
Accent/Dialect: Indonesian accent with a subtle Minang touch, speaks purely in Indonesian.
Speaking Style: medium-fast tempo, lively and expressive speaking style.
IMPORTANT: All dialogue must be in Indonesian with natural and clear pronunciation. Ensure this character's voice is consistent throughout the video.
[CHARACTER ACTION]
walking around the night bus terminal while observing the activities of passengers and vendors.
[CHARACTER EXPRESSION]
The character shows an expression of awe and enthusiasm, often smiling while glancing at the camera.
[SETTING & TIME]
Setting: at an intercity bus terminal at night, there are street vendors on the edge of the departure lane, several buses are lined up with their lights on.
Time: night, light drizzle.
[ADDITIONAL VISUAL DETAILS]
Camera Movement: ${cameraMovement}
Lighting: natural from street lights and bus lights, reflection of light on the wet asphalt.
Video/Art Style: cinematic realistic.
Visual Quality: 4K Resolution.
[OVERALL ATMOSPHERE]
A busy, crowded atmosphere, with a sense of a lively and dynamic night journey despite the rain.
[ENVIRONMENTAL SOUND (AMBIENCE)]
SOUND: the sound of bus engines starting, announcements from loudspeakers, light rain patter, and faint conversations between passengers and vendors.
[CHARACTER DIALOGUE]
DIALOGUE in Indonesian: Character says: "${dialogueOnly}"
[NEGATIVE PROMPT]
Avoid: on-screen text, subtitles, text in video, fonts, logos, distortion, artifacts, anomalies, double faces, deformed limbs, abnormal hands, extra people, distracting objects, low quality, blur, glitch, robotic voice, broken voice.`;

        promptIdContainer.innerText = idPrompt;
        promptEnContainer.innerText = enPrompt;
    }

    changeStyleBtn.addEventListener('click', () => {
        const colors = document.getElementById('style-input').value.split(',').map(s => s.trim());
        if (colors.length > 0 && colors[0]) {
            document.documentElement.style.setProperty('--primary-color', colors[0]);
            document.body.style.backgroundColor = colors[0];
        }
        if (colors.length > 1 && colors[1]) {
            document.documentElement.style.setProperty('--secondary-color', colors[1]);
            document.querySelectorAll('h1, h2, h3, button').forEach(el => el.style.color = colors[1]);
             document.querySelectorAll('button').forEach(el => el.style.backgroundColor = colors[1]);
        }
        if (colors.length > 2 && colors[2]) {
            document.documentElement.style.setProperty('--text-color', colors[2]);
            document.body.style.color = colors[2];
            const allTextElements = document.querySelectorAll('p, span, label, input, textarea, div');
            allTextElements.forEach(el => {
                if(!el.closest('button')) { // Don't change text color inside buttons
                     el.style.color = colors[2];
                }
            });
        }
    });

    changeTitleBtn.addEventListener('click', () => {
        const newTitle = document.getElementById('title-input').value;
        if (newTitle) {
            document.getElementById('main-title').textContent = newTitle;
            document.title = newTitle;
        }
    });

    nextSceneBtn.addEventListener('click', () => {
        // Only change camera, dialogue, and setting for the next scene
        document.getElementById('setting').value = "";
        document.getElementById('character-dialogue').value = 'DIALOG dalam Bahasa Indonesia: Karakter berkata: ""';
        document.getElementById('character-action').value = "";

        document.getElementById('setting').placeholder = "contoh: Di dalam bus yang mulai berjalan, melihat ke luar jendela...";
        document.getElementById('character-dialogue').placeholder = 'contoh: "Akhirnya berangkat juga..."';
        document.getElementById('character-action').placeholder = "contoh: Duduk di kursi dekat jendela, menatap pemandangan kota yang berlalu.";
        
        generatePrompt();
    });

    newStoryBtn.addEventListener('click', () => {
        // Clear character and location related fields
         document.getElementById('scene-title').value = "";
        document.getElementById('character-desc').value = "";
        document.getElementById('character-voice').value = "";
        document.getElementById('character-action').value = "";
        document.getElementById('character-expression').value = "";
        document.getElementById('setting').value = "";
        document.getElementById('overall-atmosphere').value = "";
        document.getElementById('sound-ambience').value = "";
        document.getElementById('character-dialogue').value = "";
        
        // Add new placeholders
        document.getElementById('scene-title').placeholder = "contoh: Kedai Kopi di Pagi Hari";
        document.getElementById('character-desc').placeholder = "contoh: Seorang programmer pria, 30 tahun, terlihat lelah tapi fokus...";
        document.getElementById('setting').placeholder = "contoh: Sebuah kedai kopi kecil yang nyaman di sudut kota...";

        generatePrompt();
    });

    generatePromptBtn.addEventListener('click', generatePrompt);

    // Set initial values on load
    setInitialValues();
    generatePrompt();
}); 