import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { IconButton } from '@mui/material';

import styles from './styles.module.scss';

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

        </section>
        
        <Button onClick={handleNext} variant="contained" className={styles.nextButton}>
            Continuar
        </Button>
      </main>
    )
  }
  