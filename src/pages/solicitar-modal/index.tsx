import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { IconButton } from '@mui/material';

import styles from './styles.module.scss';
import SelectComponent from '@/components/Select';

const FirstStep = () => {
    const optionsFactory = (id: number, description: string) => ({ id, description });

    const optionsVehicleProps = [
        optionsFactory(1, 'Volvo - ABC-1234'),
        optionsFactory(2, 'BMW - 1515'),
        optionsFactory(3, 'FIAT - 6576'),
        optionsFactory(4, 'Chevrolet - 4546'),
        optionsFactory(5, 'Peugeot - 1212')
    ];

    const optionsProblemsProps = [optionsFactory(1, 'Falta combustível'), optionsFactory(2, 'Pneu furado')];

    return (
        <div className={styles.firstStep}>
            <SelectComponent 
                placeholder='Veículo'
                optionsProps={optionsVehicleProps} 
            />
            
            <SelectComponent 
                placeholder='Problemas'
                optionsProps={optionsProblemsProps} 
            />
        </div>
    );
}

const SecondStep = () => {

    return (
        <div className={styles.secondStep}>
           SecondStep 
        </div>
    );
}

const ThirdStep = () => {

    return (
        <div className={styles.thirdStep}>
           ThirdStep 
        </div>
    );
}

export default function RequestModal() {
    const stepFactory = (id: number, label: string, isCompleted: boolean) => ({ id, label, isCompleted });

    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([
        stepFactory(0, 'Solicitar Modal', false),
        stepFactory(1, 'Foto frontal', false),
        stepFactory(2, 'Foto da lateral esquerda', false),
        stepFactory(3, 'Foto da lateral direita', false),
        stepFactory(4, 'Foto da traseira', false),
        stepFactory(5, 'Solicitar Modal', false)
    ]);

    const handleNext = () => {
        if (activeStep === steps.length - 1) return;

        const newSteps = steps.map(step => {
            if (step.id === activeStep) {
                step.isCompleted = true;
            }

            return step;
        })

        setSteps(newSteps);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        const lastStep = activeStep - 1;

        const newSteps = steps.map(step => {
            if (step.id === lastStep) {
                step.isCompleted = false;
            }

            return step;
        })

        setSteps(newSteps);
        setActiveStep(lastStep);
    };

    return (
      <main className={styles.requestModal}>
        <section>
            <header className={styles.header}>
                <IconButton
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    <MdKeyboardArrowLeft size={32}/>
                </IconButton>
                <h1>{steps[activeStep].label}</h1>
                &nbsp;
            </header>
            <Stepper nonLinear activeStep={activeStep} className={styles.stepper}>
                {steps.map(({ id, isCompleted }) => (
                    <Step key={id} completed={isCompleted}>
                        <StepButton color="inherit" disabled />
                    </Step>
                ))}
            </Stepper>
        </section>

        <section className={styles.content}>
            {activeStep === 0 && <FirstStep />}
            {activeStep === 1 && <SecondStep />}
            {activeStep === 2 && <ThirdStep />}
            
            {activeStep === 3 && (
                <h1>teste</h1>
            )}
        
            {activeStep === 4 && (
                <h1>teste</h1>
            )}
            
            {activeStep === 5 && (
                <h1>teste</h1>
            )}
        
        </section>
        
        <Button onClick={handleNext} variant="contained" className={styles.nextButton}>
            Continuar
        </Button>
      </main>
    )
}
  