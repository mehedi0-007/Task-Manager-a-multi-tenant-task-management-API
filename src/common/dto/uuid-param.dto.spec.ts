import { validate } from 'class-validator';
import { UuidParamDto } from './uuid-param.dto';

describe('UuidParamDto', () => {
  it('accepts UUIDs', async () => {
    const dto = new UuidParamDto();
    dto.id = '550e8400-e29b-41d4-a716-446655440000';
    await expect(validate(dto)).resolves.toHaveLength(0);
  });

  it('rejects malformed IDs', async () => {
    const dto = new UuidParamDto();
    dto.id = 'not-a-uuid';
    await expect(validate(dto)).resolves.toHaveLength(1);
  });
});
