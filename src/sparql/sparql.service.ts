import { Injectable } from '@nestjs/common';
import { ReceiveSparqlDto } from './dto/receive-sparql.dto';
import { Request } from 'express';
import { StringHelper } from '../helpers/string.helper';

@Injectable()
export class SparqlService {
  getUri(req: Request) {
    return `${req.protocol}://${req.get('Host')}${req.originalUrl}`;
  }

  toTurtle(receiveSparqlDto: ReceiveSparqlDto, uri: string) {
    console.log(receiveSparqlDto);
    const object = receiveSparqlDto.object.split(',');
    const subject = receiveSparqlDto.subject.split(',');
    const predicate = receiveSparqlDto.predicate.split(',');

    //subject: entity identifier => emp3 - Represented using URI
    //predicate: attribute name  => title - Represented using URI
    //object: attribute value => "Vice President"
    return `PREFIX ont: <${uri}>

    SELECT ${object.join('?')}
    WHERE {
      ?${subject} a db:${subject} ;
                        ${predicate.forEach((e) => {
                          return 'db:' + e + ' ?' + e + ';';
                        })}                       
    }`;
  }

  toSql(turtleQuery: string) {
    //subject: entity identifier => emp3 - Represented using URI
    //predicate: attribute name  => title - Represented using URI
    //object: attribute value => "Vice President"
    // documento: string;
    // razao_social: string;
    // nome_fantasia: string;
    return 'ok';
  }

  toTriple(queryResult: any) {
    //subject: entity identifier => emp3 - Represented using URI
    //predicate: attribute name  => title - Represented using URI
    //object: attribute value => "Vice President"
    return 'ok';
  }

  sqlToSparql(receiveSparqlDto: ReceiveSparqlDto, sqlQuery: string): string {
    return `SELECT ?s
          WHERE {
            ?s ${receiveSparqlDto.predicate} "${receiveSparqlDto.object}" .
            FILTER (str(?s) = "${receiveSparqlDto.subject}")
          }`;
  }

  getResource(subject: string, uri: string): string {
    switch (subject) {
      case 'OperadorLogistico':
        return `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX : <${uri}>
        
        <${uri}OperadorLogistico> rdf:type owl:Class;
                rdfs:label "Operador Logistico" ;
                rdfs:subClassOf :Entidade;
                rdfs:comment "Classe que representa um operador logístico." .
        
        :id a owl:DatatypeProperty ;
                rdfs:label "Identificador" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:string .
        
        :criado_em a owl:DatatypeProperty ;
                rdfs:label "Data de Criação" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:dateTime .
        
        :atualizado_em a owl:DatatypeProperty ;
                rdfs:label "Data de Atualização" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:dateTime .
        
        :documento a owl:DatatypeProperty ;
                rdfs:label "Documento" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:string .
        
        :razao_social a owl:DatatypeProperty ;
                rdfs:label "Razão Social" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:string .
        
        :nome_fantasia a owl:DatatypeProperty ;
                rdfs:label "Nome Fantasia" ;
                rdfs:domain :OperadorLogistico ;
                rdfs:range xsd:string .
        `;
      default:
        return '';
    }
  }
}
