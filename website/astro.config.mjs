// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const configuredBase = process.env.ASTRO_BASE ?? '/dci-ai-skills';
const base = configuredBase.endsWith('/') ? configuredBase : `${configuredBase}/`;

// https://astro.build/config
export default defineConfig({
	base,
	integrations: [
		starlight({
			title: 'AI Field Guide',
			sidebar: [
				{
					label: 'AI Field Guide',
					items: [
						{ slug: 'ai-field-guide' },
						{ slug: 'ai-field-guide/foundations' },
						{ slug: 'ai-field-guide/prompting' },
						{ slug: 'ai-field-guide/agents' },
						{
							label: 'Patterns',
							items: [
								{ slug: 'ai-field-guide/patterns' },
								{ slug: 'ai-field-guide/patterns/prompt-recipes' },
								{ slug: 'ai-field-guide/patterns/evaluation-loops' },
								{
									label: 'Retrieval',
									items: [
										{ slug: 'ai-field-guide/patterns/retrieval' },
										{ slug: 'ai-field-guide/patterns/retrieval/chunking' },
										{ slug: 'ai-field-guide/patterns/retrieval/ranking' },
									],
								},
							],
						},
						{
							label: 'Operations',
							items: [
								{ slug: 'ai-field-guide/operations' },
								{ slug: 'ai-field-guide/operations/monitoring' },
								{ slug: 'ai-field-guide/operations/release-checks' },
								{
									label: 'Incident Notes',
									items: [
										{ slug: 'ai-field-guide/operations/incidents' },
										{ slug: 'ai-field-guide/operations/incidents/triage' },
										{ slug: 'ai-field-guide/operations/incidents/postmortem' },
									],
								},
							],
						},
					],
				},
			],
		}),
	],
});
