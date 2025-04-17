"use client";

import EmptyContent from "@/components/ui/EmptyContent";
import SsrLayout from "./SsrLayout";

export default function NotFound() {
    return (
        <SsrLayout>
            <EmptyContent 
                title="Tính năng đang được phát triển" 
            />
        </SsrLayout>
    );
} 