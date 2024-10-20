import React, { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/Select';
import { DEFAULT_PROVIDER } from '~/utils/constants';
import type { ModelInfo } from '~/utils/types';

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
  modelList: ModelInfo[];
  providerList: string[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel, modelList, providerList }) => {
  const [provider, setProvider] = useState<string>(DEFAULT_PROVIDER);

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <Select onValueChange={(value) => setModel(value)} value={model}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {modelList
              .filter((e) => e.provider === provider && e.name)
              .map((modelOption) => (
                <SelectItem key={modelOption.name} value={modelOption.name}>
                  {modelOption.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={provider}
        onValueChange={(value) => {
          setProvider(value);

          const firstModel = modelList.find((m) => m.provider === value);

          setModel(firstModel ? firstModel.name : '');
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a provider" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {providerList.map((providerOption: string) => (
              <SelectItem key={providerOption} value={providerOption}>
                {providerOption}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
