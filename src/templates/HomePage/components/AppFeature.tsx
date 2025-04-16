import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

interface AppFeature {
    id: string;
    imageUrl: string;
    text: string;
    highlightedText: string;
    description: string;
    isReversed?: boolean;
}

interface AppFeatureProps {
    feature: AppFeature;
}

export default function AppFeature({ feature }: AppFeatureProps) {
    const { id, imageUrl, text, highlightedText, description, isReversed = false } = feature;
    return (
        <div className={clsx(
            'flex gap-8 md:gap-16',
            isReversed ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
        )}>
            {/* Image container */}
            <div className="w-full md:w-1/2">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt="App feature"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Text content */}
            <div className="w-full md:w-1/2 space-y-4">
            <div className="text-display-md bg-primary-gradient bg-clip-text text-transparent font-semibold">{id}</div>
                <div className="lg:text-display-sm text-lg lg:leading-display-md leading-lg font-semibold">
                    {text.split(highlightedText).map((part, index, array) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < array.length - 1 && (
                                <span className="bg-primary-gradient  text-white px-2 py-1 rounded-lg">
                                    {highlightedText}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <p className="text-secondary-600 text-md leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
