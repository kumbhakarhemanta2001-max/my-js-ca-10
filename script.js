 var qData = [
  { 
    q: "১ মে ২০২৬-এ প্রতিরক্ষা অর্থ সচিব হিসেবে কে দায়িত্ব নেন?", 
    a: "বিশ্বজিত সাহায়", 
    opts: ["বিশ্বজিত সাহায়", "অনুগ্রহ নারায়ণ দাস", "ভারত খেরা", "আশুতোষ গোয়ারিকর"] 
  },
  { 
    q: "Defence Finance Secretary কোন মন্ত্রকের অন্তর্গত?", 
    a: "Ministry of Defence", 
    opts: ["Finance Ministry", "Ministry of Defence", "MSME Ministry", "Home Ministry"] 
  },
  { 
    q: "Controller General of Defence Accounts (CGDA) পদে কে নিযুক্ত হয়েছেন?", 
    a: "অনুগ্রহ নারায়ণ দাস", 
    opts: ["বিশ্বজিত সাহায়", "ভারত খেরা", "অনুগ্রহ নারায়ণ দাস", "রাজীব কুমার"] 
  },
  { 
    q: "CGDA-এর প্রধান কাজ কী?", 
    a: "প্রতিরক্ষা হিসাব ও আর্থিক ব্যবস্থাপনা", 
    opts: ["সিনেমা পরিচালনা", "শিক্ষা নীতি তৈরি", "কৃষি উন্নয়ন", "প্রতিরক্ষা হিসাব ও আর্থিক ব্যবস্থাপনা"] 
  },
  { 
    q: "৫৭তম International Film Festival of India-এর Festival Director কে?", 
    a: "আশুতোষ গোয়ারিকর", 
    opts: ["অনুরাগ কাশ্যপ", "করণ জোহর", "আশুতোষ গোয়ারিকর", "রাজামৌলি"] 
  },
  { 
    q: "International Film Festival of India কোন ক্ষেত্রের সঙ্গে সম্পর্কিত?", 
    a: "চলচ্চিত্র", 
    opts: ["চলচ্চিত্র", "বিজ্ঞান", "ক্রীড়া", "শিক্ষা"] 
  },
  { 
    q: "MSME মন্ত্রকের সচিব হিসেবে কে নিযুক্ত হয়েছেন?", 
    a: "ভারত খেরা", 
    opts: ["বিশ্বজিত সাহায়", "অনুগ্রহ নারায়ণ দাস", "অমিত শাহ", "ভারত খেরা"] 
  },
  { 
    q: "MSME-এর পূর্ণরূপ কী?", 
    a: "Micro, Small and Medium Enterprises", 
    opts: ["Medium Small Market Economy", "Micro, Small and Medium Enterprises", "Ministry of Small Market Enterprises", "Multi Sector Manufacturing Entity"] 
  },
  { 
    q: "Thomas Cup 2026 কোন খেলাধুলার সঙ্গে সম্পর্কিত?", 
    a: "ব্যাডমিন্টন", 
    opts: ["ক্রিকেট", "ফুটবল", "ব্যাডমিন্টন", "টেনিস"] 
  },
  { 
    q: "Thomas Cup 2026-এ ভারত কোন স্কোরে জয় পেয়ে সেমিফাইনালে ওঠে?", 
    a: "৩-০", 
    opts: ["৩-০", "৩-১", "২-১", "১-০"] 
  }
];


var curQ = 0, userScore = 0, qTimer, secLeft = 15;


function beginQuizNow() {
    document.getElementById("start-area").style.display = "none";
    document.getElementById("quiz-main-container").style.display = "block";
    loadQuestion();
}


function loadQuestion() {
    
    if (curQ >= qData.length) { 
        showResult(); 
        return; 
    }

   
    document.getElementById("next-btn-container").style.display = "none";
    
    
    secLeft = 15;
    document.getElementById("timer-box").innerHTML = secLeft;
    document.getElementById("quiz-progress").innerHTML = "প্রশ্ন: " + (curQ + 1) + "/" + qData.length;
    document.getElementById("main-q-text").innerHTML = qData[curQ].q;
    
   
    var optsHtml = "";
    qData[curQ].opts.forEach(opt => {
        optsHtml += `<button class="opt-btn" onclick="checkAnswer(this, '${opt}')">${opt}</button>`;
    });
    document.getElementById("main-opt-container").innerHTML = optsHtml;
    
    startTimer();
}


function startTimer() {
    clearInterval(qTimer);
    qTimer = setInterval(() => {
        secLeft--;
        document.getElementById("timer-box").innerHTML = secLeft;
        if (secLeft <= 0) { 
            clearInterval(qTimer);
            checkAnswer(null, ""); 
        }
    }, 1000);
}


function checkAnswer(btn, selected) {
    clearInterval(qTimer); 
    var correct = qData[curQ].a.trim();
    var btns = document.getElementsByClassName("opt-btn");
    
   
    for (let b of btns) {
        b.disabled = true;
        if (b.innerText.trim() === correct) {
            b.classList.add("correct-ans");
        }
    }

   
    if (selected.trim() === correct) {
        userScore++;
        document.getElementById("score-val").innerText = userScore;
    } else if (btn) {
        btn.classList.add("wrong-ans");
    }

    
    document.getElementById("next-btn-container").style.display = "block";
    
    
    curQ++;
}


function showResult() {
    document.getElementById("question-area").style.display = "none";
    document.getElementById("next-btn-container").style.display = "none";
    document.getElementById("result-area").style.display = "block";
    
    var finalScore = userScore;
    var totalQ = qData.length;
    var feedback = "";
    var color = "";

    if (finalScore === totalQ) {
        feedback = "Outstanding! 🌟";
        color = "#388e3c";
    } else if (finalScore >= totalQ * 0.8) {
        feedback = "Very Good! 👏";
        color = "#0d47a1";
    } else if (finalScore >= totalQ * 0.5) {
        feedback = "Good! 👍";
        color = "#f57c00";
    } else {
        feedback = "Need More Practice! 📚";
        color = "#d32f2f";
    }

    document.getElementById("res-score").innerHTML = `
        <div style="color: ${color}; font-weight: bold; margin-bottom: 10px; font-size: 1.5rem;">${feedback}</div>
        <div style="font-size: 2.5rem;">${finalScore} / ${totalQ}</div>
    `;
}