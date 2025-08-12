import type { ErrorMessage, ObjectEntries, ObjectIssue, ObjectSchema, ValiError } from 'valibot';
import { ConvexError } from 'convex/values';

export type ValidationErrorData = {
	kind: 'validation';
	errors: Record<string, string>;
};

export class ValidationError<
	S extends ObjectSchema<ObjectEntries, ErrorMessage<ObjectIssue>>
> extends ConvexError<ValidationErrorData> {
	constructor(errors: Record<string, string> | ValiError<S>['issues']) {
		if (Array.isArray(errors)) {
			super({
				kind: 'validation',
				errors: errors.reduce(
					(acc, error) => {
						acc[error.path?.map((p) => p.key).join('.') || ''] = error.message;
						return acc;
					},
					{} as Record<string, string>
				)
			});
		} else {
			super({ kind: 'validation', errors });
		}
	}
}
