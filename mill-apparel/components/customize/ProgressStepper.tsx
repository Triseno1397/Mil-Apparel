'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
    id: number;
    name: string;
    description: string;
}

interface ProgressStepperProps {
    steps: Step[];
    currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
    return (
        <nav aria-label="Progress" className="mb-8">
            <ol role="list" className="flex items-center justify-between md:justify-center md:gap-4">
                {steps.map((step, stepIdx) => (
                    <li key={step.id} className="relative flex items-center">
                        {stepIdx !== 0 && (
                            <div
                                className="absolute right-full w-6 md:w-24 h-px -ml-1 md:-ml-12"
                                aria-hidden="true"
                            >
                                <div
                                    className={`h-full transition-colors duration-300 ${
                                        step.id <= currentStep ? 'bg-[var(--color-military-olive)]' : 'bg-[var(--color-light-gray)]'
                                    }`}
                                />
                            </div>
                        )}

                        <div className="relative flex flex-col items-center group">
                            <div
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 ${
                                    step.id < currentStep
                                        ? 'bg-[var(--color-military-olive)]'
                                        : step.id === currentStep
                                            ? 'bg-white ring-2 ring-[var(--color-military-olive)] ring-offset-2'
                                            : 'bg-white ring-1 ring-[var(--color-light-gray)]'
                                }`}
                            >
                                {step.id < currentStep ? (
                                    <Check className="w-4 h-4 text-white" />
                                ) : (
                                    <span
                                        className={`text-xs font-semibold ${
                                            step.id === currentStep
                                                ? 'text-[var(--color-military-olive)]'
                                                : 'text-[var(--color-muted)]'
                                        }`}
                                    >
                                        {step.id}
                                    </span>
                                )}
                            </div>

                            <div
                                className={`mt-2 text-center ${
                                    step.id === currentStep ? 'block' : 'hidden md:block'
                                }`}
                            >
                                <p
                                    className={`text-[11px] md:text-xs font-semibold uppercase tracking-[0.05em] ${
                                        step.id === currentStep
                                            ? 'text-[var(--color-dark)]'
                                            : step.id < currentStep
                                                ? 'text-[var(--color-military-olive)]'
                                                : 'text-[var(--color-muted)]'
                                    }`}
                                >
                                    {step.name}
                                </p>
                                <p className="hidden md:block text-[10px] text-[var(--color-muted)] mt-0.5">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
