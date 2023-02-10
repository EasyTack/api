import { Injectable } from '@nestjs/common';
import { ReceiveSparqlDto } from './dto/receive-sparql.dto';
import { Request } from 'express';
import { StringHelper } from '../helpers/string.helper';


@Injectable()
export class SparqlService {
  getUri(req: Request) {
    return `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
  }

  toTurtle(receiveSparqlDto: ReceiveSparqlDto) {
    return `PREFIX ol: <${receiveSparqlDto.iri}>
    SELECT ?${receiveSparqlDto.subject} ?${receiveSparqlDto.predicate} ?${receiveSparqlDto.object}
    WHERE {
      ?${receiveSparqlDto.subject} ?${receiveSparqlDto.predicate} ?${receiveSparqlDto.object} .
    }`;
  }

  toSql(triple: string) {
    const subjectRegex = /(\?)?(\w+)\s/;
    const predicateRegex = /(\w+:)(\w+)\s/;
    const objectRegex = /"(.*)"\s\./;

    const subject = triple.match(subjectRegex)?.[0].trim();
    const predicate = triple.match(predicateRegex)?.[0].trim();
    let object = triple.match(objectRegex)?.[0].trim().replace(/\"/g, '');
    object = object.slice(0, -2);

    let column = '';
    switch (predicate) {
      case 'ol:id':
        column = 'id';
        break;
      case 'ol:criado_em':
        column = 'criado_em';
        break;
      case 'ol:atualizado_em':
        column = 'atualizado_em';
        break;
      case 'ol:documento':
        column = 'documento';
        break;
      case 'ol:razao_social':
        column = 'razao_social';
        break;
      case 'ol:nome_fantasia':
        column = 'nome_fantasia';
        break;
      default:
        throw new Error(`Predicado não suportado: ${predicate}`);
    }

    const sql = `SELECT * FROM operador_logistico WHERE ${column} = '${object}'`;

    return sql;
  }

  toTriple(query: string, endpoint: string, data) {
    const result = [];
    for (const key in data) {
      result.push({ subject: `ol:${data[key] instanceof Date ? data[key].toISOString() : data[key]}`, object: `ol:${key}`, predicate: `${data[key] instanceof Date ? data[key].toISOString() : data[key]}` });
    }
    return result;
  }

  getResource(subject: string, uri: string): string {
    switch (subject) {
      case 'OperadorLogistico':
        return `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX ol: <${uri}>
        
        ol:OperadorLogistico rdf:type owl:Class;
        rdfs:label "Operador Logistico" ;
        rdfs:subClassOf ol:Entidade;
        rdfs:comment "Classe que representa um operador logístico." .

        ol:id a owl:DatatypeProperty ;
                rdfs:label "Identificador" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:string .

        ol:criado_em a owl:DatatypeProperty ;
                rdfs:label "Data de Criação" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:dateTime .

        ol:atualizado_em a owl:DatatypeProperty ;
                rdfs:label "Data de Atualização" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:dateTime .

        ol:documento a owl:DatatypeProperty ;
                rdfs:label "Documento" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:string .

        ol:razao_social a owl:DatatypeProperty ;
                rdfs:label "Razão Social" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:string .

        ol:nome_fantasia a owl:DatatypeProperty ;
                rdfs:label "Nome Fantasia" ;
                rdfs:domain ol:OperadorLogistico ;
                rdfs:range xsd:string .

        `;
      default:
        return '';
    }
  }
}
