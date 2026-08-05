import React from 'react';
import Image from 'next/image';

const LogoWrapper = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <div className={`relative w-full h-full ${className || ''}`}>
    <Image src={src} alt={alt} fill className="object-contain" />
  </div>
);

export const TransbankSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/transbank.png" alt="Transbank" className={className} />;
export const MercadoPagoSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/mercadopago.png" alt="Mercado Pago" className={className} />;
export const AnthropicSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/anthropic.png" alt="Anthropic" className={className} />;
export const AwsSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/aws.png" alt="AWS" className={className} />;
export const AzureSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/azure.png" alt="Azure" className={className} />;
export const GoogleCloudSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/gcp.png" alt="Google Cloud" className={className} />;
export const DockerSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/docker.png" alt="Docker" className={className} />;
export const KubernetesSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/kubernetes.png" alt="Kubernetes" className={className} />;
export const OpenAiSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/openai.png" alt="OpenAI" className={className} />;
export const GeminiSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/gemini.png" alt="Gemini" className={className} />;
export const NvidiaSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/nvidia.png" alt="NVIDIA" className={className} />;
export const LangChainSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/langchain.png" alt="LangChain" className={className} />;
export const SnowflakeSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/snowflake.png" alt="Snowflake" className={className} />;
export const DatadogSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/datadog.png" alt="Datadog" className={className} />;
export const DatabricksSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/databricks.png" alt="Databricks" className={className} />;
export const CiCdSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/cicd.png" alt="CI/CD" className={className} />;
export const UiPathSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/uipath.png" alt="UiPath" className={className} />;
export const ZeroTrustSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/zerotrust.png" alt="Zero Trust" className={className} />;
export const NextJsSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/nextjs.png" alt="Next.js" className={className} />;
export const GraphQlSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/graphql.png" alt="GraphQL" className={className} />;
export const VercelSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/vercel.png" alt="Vercel" className={className} />;
export const SiiSvg = ({ className }: { className?: string }) => <LogoWrapper src="/logos/sii.png" alt="SII" className={className} />;
