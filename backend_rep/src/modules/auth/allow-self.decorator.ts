import { SetMetadata } from '@nestjs/common';

export const AllowSelf = () => SetMetadata('allow-self', true);
