import React, { useState } from 'react';
import './BMICalculator.css';

const BMICalculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [weightLbs, setWeightLbs] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');
    const [calories, setCalories] = useState('');

    const calculateBMI = () => {
        const totalHeightInMeters = ((heightFeet * 12 + parseInt(heightInches)) * 0.0254);
        const weightInKg = weightLbs * 0.453592;
        const bmiValue = (weightInKg / (totalHeightInMeters * totalHeightInMeters)).toFixed(2);
        setBmi(bmiValue);

        let status = '';
        if (bmiValue < 18.5) status = 'Underweight';
        else if (bmiValue >= 18.5 && bmiValue < 24.9) status = 'Normal weight';
        else if (bmiValue >= 25 && bmiValue < 29.9) status = 'Overweight';
        else status = 'Obese';
        setStatus(status);

        const bmr = gender === 'male'
            ? 10 * weightInKg + 6.25 * (totalHeightInMeters * 100) - 5 * age + 5
            : 10 * weightInKg + 6.25 * (totalHeightInMeters * 100) - 5 * age - 161;
        const maintenanceCalories = (bmr * 1.2).toFixed(0);
        setCalories(maintenanceCalories);
    };

    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <div>
            <button className="open-modal-button" onClick={toggleModal}>
                BMI Calculator
            </button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>BMI Calculator</h2>
                        <div>
                            <label>Age:</label>
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div>
                            <label>Gender:</label>
                            <select
                            style={{ width: '348px' }} value={gender} onChange={(e) => setGender(e.target.value)} className="gender-select">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="non-binary">Non-binary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label>Height:</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="number"
                                    placeholder="Feet"
                                    value={heightFeet}
                                    onChange={(e) => setHeightFeet(e.target.value)}
                                    style={{ width: '169px', marginRight: '10px' }}
                                />
                                <input
                                    type="number"
                                    placeholder="Inches"
                                    value={heightInches}
                                    onChange={(e) => setHeightInches(e.target.value)}
                                    style={{ width: '169px' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Weight (lbs):</label>
                            <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} />
                        </div>
                        <button className="calculate-button" onClick={calculateBMI}>Calculate</button>
                        {bmi && (
                            <div className="results">
                                <h3>Your BMI: {bmi}</h3>
                                <p>Status: {status}</p>
                                <p>Maintenance Calories: {calories} kcal/day</p>
                            </div>
                        )}
                        <button className="close-modal-button" onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
