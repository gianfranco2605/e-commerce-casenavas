interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  ImageDimention: { width: number; height: number };
}

const DesignConfigurator = ({
  configId,
  imageUrl,
  ImageDimention,
}: DesignConfiguratorProps) => {
  return <div>DesignConfigurator</div>;
};

export default DesignConfigurator;
