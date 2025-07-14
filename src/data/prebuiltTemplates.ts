
import { religiousTemplates } from './templates/religiousTemplates';
import { businessTemplates } from './templates/businessTemplates';
import { personalTemplates } from './templates/personalTemplates';
import { socialTemplates } from './templates/socialTemplates';
import { advertisementTemplates } from './templates/advertisementTemplates';
import { cvTemplates } from './templates/cvTemplates';
import { logoTemplates } from './templates/logoTemplates';

export const prebuiltTemplates = {
  ...religiousTemplates,
  ...businessTemplates,
  ...personalTemplates,
  ...socialTemplates,
  ...advertisementTemplates,
  ...cvTemplates,
  ...logoTemplates
};
