import Bucket from 'cloudform-types/types/s3/bucket';
import _ from 'lodash';
import { applyS3SSEModification } from '../../../pre-push-cfn-processor/modifiers/s3-sse-modifier';

describe('applyS3SSEModification', () => {
  it('does not overwrite existing SSE configuration', async () => {
    const bucketBefore = {
      Properties: {
        BucketEncryption: {},
      },
    } as Bucket;

    const bucket = _.cloneDeep(bucketBefore);

    applyS3SSEModification(bucket);
    expect(bucket).toStrictEqual(bucketBefore);
  });

  it('assigns config when no Parameters were present before', async () => {
    const bucket = {} as Bucket;

    applyS3SSEModification(bucket);

    expect(bucket.Properties.BucketEncryption).toMatchInlineSnapshot(`
      BucketEncryption {
        "ServerSideEncryptionConfiguration": Array [
          ServerSideEncryptionRule {
            "ServerSideEncryptionByDefault": ServerSideEncryptionByDefault {
              "SSEAlgorithm": "AES256",
            },
          },
        ],
      }
    `);
  });
});
