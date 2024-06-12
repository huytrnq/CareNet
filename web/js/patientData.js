document.addEventListener('DOMContentLoaded', function() {
    const patientRows = document.querySelectorAll('.patient-row');
    const addRiskFactorBtn = document.getElementById('add-risk-factor-btn');
    const riskFactorList = document.getElementById('risk-factor-list');

    const patientData = {};

    const randomData = {
        riskFactors: [
            'High cholesterol', 'Diabetes', 'Hypertension', 'Smoking', 'Obesity'
        ],
        physicalExam: {
            heart: [
                'Normal', 'Murmur detected', 'Irregular heartbeat'
            ],
            bp: [
                '120/80 mm/Hg', '130/85 mm/Hg', '140/90 mm/Hg'
            ],
            pulse: [
                '70 / min', '80 / min', '90 / min'
            ],
            abdomen: [
                'Normal', 'Pain on left side', 'Pain on right side'
            ],
            weight: [
                '70 Kg', '75 Kg', '80 Kg'
            ],
            height: [
                '170 cm', '175 cm', '180 cm'
            ]
        },
        imaging: {
            xray: [
                'Normal', 'Fracture detected', 'Inflammation detected'
            ],
            ultrasound: [
                'Normal', 'Abnormal growth detected', 'Fluid accumulation detected'
            ]
        }
    };

    function getRandomElement(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function displayRiskFactors(patientId) {
        riskFactorList.innerHTML = '';
        if (patientData[patientId] && patientData[patientId].riskFactors.length > 0) {
            riskFactorList.classList.remove('hidden');
            patientData[patientId].riskFactors.forEach(factor => {
                const li = document.createElement('li');
                li.textContent = factor;
                riskFactorList.appendChild(li);
            });
        } else {
            riskFactorList.classList.add('hidden');
        }
    }

    function addRiskFactor(patientId, factor) {
        if (!patientData[patientId]) {
            patientData[patientId] = { riskFactors: [] };
        }
        patientData[patientId].riskFactors.push(factor);
        displayRiskFactors(patientId);
    }

    patientRows.forEach(row => {
        row.addEventListener('click', () => {
            const patientId = row.getAttribute('data-id');
            displayRiskFactors(patientId);
            document.querySelector('.heart-status').textContent = getRandomElement(randomData.physicalExam.heart);
            document.querySelector('.bp-status').textContent = getRandomElement(randomData.physicalExam.bp);
            document.querySelector('.pulse-status').textContent = getRandomElement(randomData.physicalExam.pulse);
            document.querySelector('.abdomen-status').textContent = getRandomElement(randomData.physicalExam.abdomen);
            document.querySelector('.weight-status').textContent = getRandomElement(randomData.physicalExam.weight);
            document.querySelector('.height-status').textContent = getRandomElement(randomData.physicalExam.height);
            document.querySelector('.xray-description').textContent = getRandomElement(randomData.imaging.xray);
            document.querySelector('.ultrasound-description').textContent = getRandomElement(randomData.imaging.ultrasound);
            addRiskFactorBtn.setAttribute('data-patient-id', patientId);
        });
    });

    addRiskFactorBtn.addEventListener('click', () => {
        const patientId = addRiskFactorBtn.getAttribute('data-patient-id');
        const riskFactor = prompt("Enter new risk factor:");
        if (riskFactor && patientId) {
            addRiskFactor(patientId, riskFactor);
        }
    });
});
