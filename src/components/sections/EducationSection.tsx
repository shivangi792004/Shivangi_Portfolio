import React from 'react';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { educationList, certificationsList } from '../../data/education';
import { links } from '../../data/links';
import { GraduationCap, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <SectionContainer
      id="education"
      title="Education & Certifications"
      subtitle="Academic degrees, university foundations, and verified industry certifications."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Education Credentials */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-accent-500" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Academic Background
            </h3>
          </div>

          <div className="space-y-4">
            {educationList.map((edu, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {edu.institution}
                  </h4>
                  <Badge variant="accent" size="sm" className="w-fit font-mono">
                    {edu.grade}
                  </Badge>
                </div>

                <p className="text-sm font-medium text-accent-600 dark:text-accent-400">
                  {edu.degree}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 mt-3 pt-3 border-t border-border-light/70 dark:border-border/60">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Technical Certifications
            </h3>
          </div>

          <div className="space-y-4">
            {certificationsList.map((cert, idx) => {
              const verifyUrl = links[cert.verifyUrlKey];

              return (
                <Card key={idx} className="p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mt-1">
                      {cert.issuer} &bull; {cert.date}
                    </p>
                  </div>

                  {/* Verify button only shown if URL exists in links.ts */}
                  {verifyUrl && (
                    <div className="mt-4 pt-3 border-t border-border-light/60 dark:border-border/60">
                      <Button
                        href={verifyUrl}
                        variant="ghost"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs p-0 h-auto text-accent-600 dark:text-accent-400 hover:underline"
                        aria-label={`Verify ${cert.title} certificate`}
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

