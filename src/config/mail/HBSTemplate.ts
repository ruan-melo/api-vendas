import handlebars from 'handlebars';
import fs from 'fs';

interface TemplateVariable {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  file: string;
  variables: TemplateVariable;
}

class HBSTemplate {
  async parse({ file, variables }: ParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HBSTemplate;
