import Layout from "@/components/layouts/layout";
const SsrLayout = async ({ children }: { children: React.ReactNode }) => {
    return <Layout>{children}</Layout>;
};

export default SsrLayout;
