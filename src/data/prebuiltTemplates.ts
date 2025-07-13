
import { religiousTemplates } from './templates/religiousTemplates';
import { businessTemplates } from './templates/businessTemplates';
import { personalTemplates } from './templates/personalTemplates';
import { socialTemplates } from './templates/socialTemplates';
import { advertisementTemplates } from './templates/advertisementTemplates';

export const prebuiltTemplates = {
  ...religiousTemplates,
  ...businessTemplates,
  ...personalTemplates,
  ...socialTemplates,
  ...advertisementTemplates
};
